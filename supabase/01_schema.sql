-- Prof Abolaji Platform: Initial Schema Setup

-- 1. Journal Posts
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  featured_image text,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public posts are viewable by everyone."
ON posts FOR SELECT
USING (published_at IS NOT NULL);

-- Allow admins to do everything
CREATE POLICY "Authenticated admins can manage posts."
ON posts FOR ALL
USING (auth.role() = 'authenticated');


-- 2. Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Anyone can subscribe"
ON newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Allow admins to read
CREATE POLICY "Only authenticated users can view subscribers"
ON newsletter_subscribers FOR SELECT
USING (auth.role() = 'authenticated');


-- 3. Contact Inquiries
CREATE TABLE contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiry"
ON contact_inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view inquiries"
ON contact_inquiries FOR SELECT
USING (auth.role() = 'authenticated');
