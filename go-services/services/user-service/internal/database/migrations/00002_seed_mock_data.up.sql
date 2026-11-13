-- Mock data for local development. Runs once on a fresh volume
-- (docker-entrypoint-initdb.d). Every account's password is: password123
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (id, name, bio, email, image_url, password, created_at, updated_at) VALUES
  ('3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', 'Sokha Chan',     'Photographer · Siem Reap',    'sokha@goghi.dev',    'https://i.pinimg.com/1200x/c1/99/af/c199af4b99a09e7627756bba03471abe.jpg', crypt('password123', gen_salt('bf')), now() - interval '90 days', now() - interval '5 days'),
  ('8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', 'Dara Vann',      'Building things with Go',     'dara@goghi.dev',     'https://i.pinimg.com/1200x/6d/1b/83/6d1b839967e85ccabdc2753abdcf836b.jpg', crypt('password123', gen_salt('bf')), now() - interval '60 days', now() - interval '2 days'),
  ('c7e05a92-91d3-4f6b-8a14-3b2d7c5e9f03', 'Lina Meas',      'Coffee, books, long walks',   'lina@goghi.dev',     'https://i.pinimg.com/1200x/ac/10/5d/ac105d47c77a0ce51ad6f1f6b72755ce.jpg', crypt('password123', gen_salt('bf')), now() - interval '45 days', now() - interval '45 days'),
  ('1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104', 'Vireak Sok',     'Designer. Khmer type nerd.',  'vireak@goghi.dev',   'https://i.pinimg.com/736x/7a/8a/d2/7a8ad2bb47aaedf5b88124e41a05eb4a.jpg',  crypt('password123', gen_salt('bf')), now() - interval '30 days', now() - interval '30 days'),
  ('e5a2c80d-34f1-4b79-8d6a-92c7e1f3b505', 'Sreyneang Kim',  NULL,                          'sreyneang@goghi.dev','https://i.pinimg.com/736x/b3/23/2b/b3232b87501126b662f3f91d0a50650b.jpg',  crypt('password123', gen_salt('bf')), now() - interval '12 days', now() - interval '12 days')
ON CONFLICT DO NOTHING;

-- user_id is the person being followed, follower_id is the follower.
-- Dara (8d41…) is followed by Sokha, Lina, Vireak, Sreyneang and follows Sokha and Vireak.
INSERT INTO followers (user_id, follower_id, created_at) VALUES
  ('8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', '3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', now() - interval '20 days'),
  ('8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', 'c7e05a92-91d3-4f6b-8a14-3b2d7c5e9f03', now() - interval '20 days'),
  ('8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', '1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104', now() - interval '20 days'),
  ('8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', 'e5a2c80d-34f1-4b79-8d6a-92c7e1f3b505', now() - interval '20 days'),
  ('3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01', '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '15 days'),
  ('1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104', '8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702', now() - interval '15 days')
ON CONFLICT DO NOTHING;
