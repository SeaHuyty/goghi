-- Mock data for local development. Runs once on a fresh volume
-- (docker-entrypoint-initdb.d). user_id values match the user-service seed.

INSERT INTO posts (id, caption, user_id, created_at, updated_at) VALUES
  ('a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', 'Sunrise over Angkor ☀️ worth the 4am wake-up.',                          '3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', now() - interval '18 minutes', now() - interval '18 minutes'),
  ('a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22', 'សួស្តី! Morning coffee and a fresh `go run`.',                           '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '95 minutes', now() - interval '95 minutes'),
  ('a3d2e5b4-8a7d-4c9b-8e32-9f4a1d6b7c33', 'Just a thought: small, boring services beat clever ones. Every time.',  'c7e05a92-91d3-4f6b-8a14-3b2d7c5e9f03', now() - interval '5 hours',     now() - interval '5 hours'),
  ('a4c3f6a5-9b8e-4d0c-9f43-0a5b2e7c8d44', 'Type specimen sketches for a new Khmer display face.',                   '1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104', now() - interval '26 hours',    now() - interval '26 hours'),
  ('a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', 'Weekend moodboard ✨ saving these for later.',                            'e5a2c80d-34f1-4b79-8d6a-92c7e1f3b505', now() - interval '50 hours',    now() - interval '50 hours'),
  ('a6c5b8a7-1d0a-4f2e-9b65-2c7d4a9e0f66', 'Slow Sunday.',                                                           '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '3 days',      now() - interval '3 days'),
  ('a7d6c9b8-2e1b-4a3f-8c76-3d8e5b0a1a77', 'Shipping day. Tests green, coffee cold.',                                '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '6 days',      now() - interval '6 days'),
  ('a8e7dac9-3f2c-4b4a-9d87-4e9f6c1b2b88', 'Trip dump 📸',                                                            '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '9 days',      now() - interval '9 days'),
  ('a9f8ebda-4a3d-4c5b-8e98-5f0a7d2c3c99', 'Found this one in the archive.',                                         '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '12 days',     now() - interval '12 days')
ON CONFLICT DO NOTHING;

INSERT INTO post_images (id, post_id, image_url, created_at) VALUES
  ('b0a1c2d3-0000-4000-8000-000000000100', 'a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', 'https://i.pinimg.com/1200x/33/c0/26/33c0269e86e92998ecb9147540ecc606.jpg', now() - interval '18 minutes'),
  ('b0a1c2d3-0000-4000-8000-000000000101', 'a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', 'https://i.pinimg.com/736x/02/bb/51/02bb51ae13d9ba3e638e045a80e3c094.jpg',  now() - interval '18 minutes'),
  ('b0a1c2d3-0000-4000-8000-000000000102', 'a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', 'https://i.pinimg.com/1200x/60/bc/a9/60bca9bd2393560924fb175a8c4153a8.jpg', now() - interval '18 minutes'),
  ('b0a1c2d3-0000-4000-8000-000000000200', 'a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22', 'https://i.pinimg.com/736x/2c/b9/07/2cb90705f7f4fc13ee3d4bf68d6bdb70.jpg',  now() - interval '95 minutes'),
  ('b0a1c2d3-0000-4000-8000-000000000201', 'a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22', 'https://i.pinimg.com/736x/60/a2/08/60a20853c9c1c54836d62574899b1eb3.jpg',  now() - interval '95 minutes'),
  ('b0a1c2d3-0000-4000-8000-000000000400', 'a4c3f6a5-9b8e-4d0c-9f43-0a5b2e7c8d44', 'https://i.pinimg.com/736x/56/d9/44/56d944f5bb25fefc9b7fd5225e07152f.jpg',  now() - interval '26 hours'),
  ('b0a1c2d3-0000-4000-8000-000000000401', 'a4c3f6a5-9b8e-4d0c-9f43-0a5b2e7c8d44', 'https://i.pinimg.com/736x/2b/5c/38/2b5c38a351b607cf0ae6487a32090cbe.jpg',  now() - interval '26 hours'),
  ('b0a1c2d3-0000-4000-8000-000000000500', 'a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', 'https://i.pinimg.com/736x/22/08/79/220879432c666bd3abbbb24fe8bc8cf9.jpg',  now() - interval '50 hours'),
  ('b0a1c2d3-0000-4000-8000-000000000501', 'a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', 'https://i.pinimg.com/736x/ab/f7/f0/abf7f0b5a58c206c0e382db0f988a3c1.jpg',  now() - interval '50 hours'),
  ('b0a1c2d3-0000-4000-8000-000000000502', 'a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', 'https://i.pinimg.com/1200x/5b/b9/3d/5bb93d68806832f23ca81b111254fc0e.jpg', now() - interval '50 hours'),
  ('b0a1c2d3-0000-4000-8000-000000000600', 'a6c5b8a7-1d0a-4f2e-9b65-2c7d4a9e0f66', 'https://i.pinimg.com/736x/61/91/1c/61911c8806360e03a4d578812fefdbf8.jpg',  now() - interval '3 days'),
  ('b0a1c2d3-0000-4000-8000-000000000700', 'a8e7dac9-3f2c-4b4a-9d87-4e9f6c1b2b88', 'https://i.pinimg.com/1200x/78/3c/10/783c1069c6072e219fd5d9c6f27c8f89.jpg', now() - interval '9 days'),
  ('b0a1c2d3-0000-4000-8000-000000000800', 'a9f8ebda-4a3d-4c5b-8e98-5f0a7d2c3c99', 'https://i.pinimg.com/736x/f6/38/ba/f638bac3a08dd2ad9a5c768d64e52a68.jpg',  now() - interval '12 days')
ON CONFLICT DO NOTHING;

-- users: 0 Sokha 3f2a…, 1 Dara 8d41…, 2 Lina c7e0…, 3 Vireak 1b9d…, 4 Sreyneang e5a2…
INSERT INTO comments (id, post_id, user_id, content, created_at) VALUES
  ('d1000000-0000-4000-8000-000000000001', 'a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', 'Unreal light 😍',                   now() - interval '15 minutes'),
  ('d1000000-0000-4000-8000-000000000002', 'a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', 'c7e05a92-91d3-4f6b-8a14-3b2d7c5e9f03', 'Adding this to my bucket list.',   now() - interval '11 minutes'),
  ('d1000000-0000-4000-8000-000000000003', 'a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', '1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104', 'The third shot!',                  now() - interval '6 minutes'),
  ('d1000000-0000-4000-8000-000000000004', 'a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22', '3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', 'Which roast?',                      now() - interval '80 minutes'),
  ('d1000000-0000-4000-8000-000000000005', 'a3d2e5b4-8a7d-4c9b-8e32-9f4a1d6b7c33', '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', '100%. Boring scales.',             now() - interval '4 hours'),
  ('d1000000-0000-4000-8000-000000000006', 'a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', '3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', 'Love the palette.',                now() - interval '48 hours')
ON CONFLICT DO NOTHING;

INSERT INTO likes (post_id, user_id, created_at) VALUES
  ('a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '14 minutes'),
  ('a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', 'c7e05a92-91d3-4f6b-8a14-3b2d7c5e9f03', now() - interval '14 minutes'),
  ('a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', '1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104', now() - interval '14 minutes'),
  ('a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11', 'e5a2c80d-34f1-4b79-8d6a-92c7e1f3b505', now() - interval '14 minutes'),
  ('a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22', '3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', now() - interval '70 minutes'),
  ('a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22', 'c7e05a92-91d3-4f6b-8a14-3b2d7c5e9f03', now() - interval '70 minutes'),
  ('a3d2e5b4-8a7d-4c9b-8e32-9f4a1d6b7c33', '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '4 hours'),
  ('a4c3f6a5-9b8e-4d0c-9f43-0a5b2e7c8d44', '3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', now() - interval '20 hours'),
  ('a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', '3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', now() - interval '48 hours'),
  ('a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '48 hours'),
  ('a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55', '1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104', now() - interval '48 hours')
ON CONFLICT DO NOTHING;
