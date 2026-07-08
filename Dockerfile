# ---- Builder: installeert alles + bouwt (wordt weggegooid) ----
FROM node:20-alpine AS builder
RUN apk add --no-cache tzdata
RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community/

WORKDIR /app

# Deps eerst voor betere layer-caching
COPY package*.json ./
RUN npm ci

# Rest van de broncode
COPY . .

# Build-time argumenten van CapRover
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
ARG NEXT_PUBLIC_EMAILJS_SERVICE_ID
ARG NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG EMAILJS_PRIVATE_KEY
ARG RECAPTCHA_SECRET_KEY
ARG BOL_API_CLIENT_ID
ARG BOL_API_CLIENT_SECRET
ARG BOL_PRODUCT_FEED_USERNAME
ARG BOL_PRODUCT_FEED_PASSWORD
ARG ADMIN_PASSWORD
ARG DATABASE_URL

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=$NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
ENV NEXT_PUBLIC_EMAILJS_SERVICE_ID=$NEXT_PUBLIC_EMAILJS_SERVICE_ID
ENV NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=$NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV EMAILJS_PRIVATE_KEY=$EMAILJS_PRIVATE_KEY
ENV RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY
ENV BOL_API_CLIENT_ID=$BOL_API_CLIENT_ID
ENV BOL_API_CLIENT_SECRET=$BOL_API_CLIENT_SECRET
ENV BOL_PRODUCT_FEED_USERNAME=$BOL_PRODUCT_FEED_USERNAME
ENV BOL_PRODUCT_FEED_PASSWORD=$BOL_PRODUCT_FEED_PASSWORD
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

# DevDependencies + build-cache weggooien: houdt prod-deps (incl. drizzle-kit
# voor de migratie bij start) over, gooit typescript/eslint/tailwind/postcss weg.
RUN npm prune --omit=dev && rm -rf .next/cache

# ---- Runner: schone image zonder compilers ----
FROM node:20-alpine AS runner
RUN apk add --no-cache tzdata

ENV TZ=Europe/Amsterdam
RUN cp /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone

WORKDIR /app

# Alles uit de builder (geprunede node_modules, .next, broncode,
# scripts/migrate.js, drizzle-migraties, start.sh) — niets ontbreekt, dus het
# runtime-gedrag is identiek aan voorheen (nog steeds `next start`).
COPY --from=builder /app ./

EXPOSE 3000
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN chmod +x /app/start.sh

CMD [ "/app/start.sh" ]
