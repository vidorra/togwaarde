-- Seed 21 kennisbank pages for togwaarde website
-- These pages will be used to organize affiliate products

INSERT INTO pages (id, title, path, category, website, created_at, updated_at) VALUES
  -- Basis/Fundamentals Category
  ('wat-is-tog', 'Wat is TOG?', '/kennisbank/wat-is-tog', 'basis', 'togwaarde', NOW(), NOW()),
  ('wat-is-tog-waarde', 'Wat is TOG Waarde?', '/kennisbank/wat-is-tog-waarde', 'basis', 'togwaarde', NOW(), NOW()),
  ('tog-schaal-overzicht', 'TOG Schaal Overzicht', '/kennisbank/tog-schaal-overzicht', 'basis', 'togwaarde', NOW(), NOW()),

  -- Calculation/Understanding Category
  ('tog-waarde-berekenen', 'TOG Waarde Berekenen', '/kennisbank/tog-waarde-berekenen', 'berekening', 'togwaarde', NOW(), NOW()),
  ('tog-waarde-babykleding-tabel', 'TOG Waarde Babykleding Tabel', '/kennisbank/tog-waarde-babykleding-tabel', 'berekening', 'togwaarde', NOW(), NOW()),

  -- Seasonal Category
  ('tog-waarde-per-seizoen', 'TOG Waarde per Seizoen', '/kennisbank/tog-waarde-per-seizoen', 'seizoen', 'togwaarde', NOW(), NOW()),
  ('tog-waarde-winter', 'TOG Waarde Winter', '/kennisbank/tog-waarde-winter', 'seizoen', 'togwaarde', NOW(), NOW()),
  ('baby-slapen-zomer', 'Baby Slapen Zomer', '/kennisbank/baby-slapen-zomer', 'seizoen', 'togwaarde', NOW(), NOW()),

  -- Sleep Sack/Clothing Category
  ('baby-slaapzak-koopgids', 'Baby Slaapzak Koopgids', '/kennisbank/baby-slaapzak-koopgids', 'slaapzak', 'togwaarde', NOW(), NOW()),
  ('nederlandse-merken-vergelijking', 'Nederlandse Merken Vergelijking', '/kennisbank/nederlandse-merken-vergelijking', 'slaapzak', 'togwaarde', NOW(), NOW()),
  ('kleding-onder-slaapzak', 'Kleding onder Slaapzak', '/kennisbank/kleding-onder-slaapzak', 'slaapzak', 'togwaarde', NOW(), NOW()),

  -- Temperature Category
  ('babykamer-temperatuur', 'Babykamer Temperatuur', '/kennisbank/babykamer-temperatuur', 'temperatuur', 'togwaarde', NOW(), NOW()),
  ('baby-temperatuur-controleren', 'Baby Temperatuur Controleren', '/kennisbank/baby-temperatuur-controleren', 'temperatuur', 'togwaarde', NOW(), NOW()),
  ('veilige-slaaptemperatuur', 'Veilige Slaaptemperatuur', '/kennisbank/veilige-slaaptemperatuur', 'temperatuur', 'togwaarde', NOW(), NOW()),

  -- Safety Category (SIDS/Overheating Prevention)
  ('oververhitting-herkennen', 'Oververhitting Herkennen', '/kennisbank/oververhitting-herkennen', 'veiligheid', 'togwaarde', NOW(), NOW()),
  ('warmtestuwing-baby', 'Warmtestuwing Baby', '/kennisbank/warmtestuwing-baby', 'veiligheid', 'togwaarde', NOW(), NOW()),
  ('wiegendood-preventie', 'Wiegendood Preventie', '/kennisbank/wiegendood-preventie', 'veiligheid', 'togwaarde', NOW(), NOW()),
  ('wiegendood-voorkomen-tog', 'Wiegendood Voorkomen TOG', '/kennisbank/wiegendood-voorkomen-tog', 'veiligheid', 'togwaarde', NOW(), NOW()),

  -- Special Cases Category
  ('inbakeren-tog-waarde', 'Inbakeren TOG Waarde', '/kennisbank/inbakeren-tog-waarde', 'speciaal', 'togwaarde', NOW(), NOW()),
  ('premature-baby-tog-waarde', 'Premature Baby TOG Waarde', '/kennisbank/premature-baby-tog-waarde', 'speciaal', 'togwaarde', NOW(), NOW()),

  -- Main Index
  ('kennisbank', 'Kennisbank', '/kennisbank', 'index', 'togwaarde', NOW(), NOW())

ON CONFLICT (id) DO NOTHING;
