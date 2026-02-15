
CREATE TABLE public.fleet (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  role TEXT NOT NULL,
  cargo BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fleet ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fleet" ON public.fleet FOR SELECT USING (true);

-- Seed with current fleet data
INSERT INTO public.fleet (type, role, cargo, sort_order) VALUES
  ('Airbus A319', 'Short-haul', false, 0),
  ('Airbus A320', 'Core narrowbody', false, 1),
  ('Airbus A321', 'High-capacity short-haul', false, 2),
  ('Airbus A350-900', 'Long-haul flagship', false, 3),
  ('Boeing 777-300ER', 'Long-haul widebody', false, 4),
  ('ATR 72', 'Cargo', true, 5),
  ('Airbus A330-200', 'Cargo', true, 6);
