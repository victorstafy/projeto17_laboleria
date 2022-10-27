--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cakes (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    price numeric NOT NULL,
    image character varying(100) NOT NULL,
    description text NOT NULL
);


--
-- Name: cakes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cakes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cakes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cakes_id_seq OWNED BY public.cakes.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    address character varying(100) NOT NULL,
    phone character varying(11) NOT NULL
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "cakeId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "totalPrice" numeric NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: cakes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes ALTER COLUMN id SET DEFAULT nextval('public.cakes_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: cakes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cakes VALUES (1, 'Bolo de pote', 22, 'http://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (2, 'Bolo de pote 2', 22, 'http://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (3, 'Bolo de pote 6', 22.22, 'http://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (4, 'Bolo sem pote', 22.22, 'http://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (5, 'Bolo sem pote 1', 2.2, 'http://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (6, 'Bolo sem pote 2', 2.2, 'http://encurtador.com.br/iDIX0', '');
INSERT INTO public.cakes VALUES (7, 'Bolo sem pote 4', 2.2, 'http://encurtador', 'Bolo de chocolate com recheio de leite ninho');


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES (1, 'Fulana', 'Rua tal', '2199999999');
INSERT INTO public.clients VALUES (2, 'Fulana', 'Rua tal', '21999999990');
INSERT INTO public.clients VALUES (3, 'Fulana', 'Rua tal', '2199999999');
INSERT INTO public.clients VALUES (4, 'Fulana', 'Rua tal', '21999999990');
INSERT INTO public.clients VALUES (5, ' ', 'Rua tal', '21999999990');
INSERT INTO public.clients VALUES (6, 'Fulana', 'Rua tal 22', '21999999990');
INSERT INTO public.clients VALUES (7, 'Fulana', 'Rua 22 com 17', '21999999990');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES (1, 1, 1, 2, '2022-10-27 00:40:20', 26);
INSERT INTO public.orders VALUES (2, 1, 2, 3, '2022-10-27 00:42:42', 22);
INSERT INTO public.orders VALUES (3, 1, 2, 3, '2022-10-27 00:44:24', 22.05);
INSERT INTO public.orders VALUES (4, 1, 3, 4, '2022-10-27 10:14:56', 88);
INSERT INTO public.orders VALUES (5, 6, 3, 4, '2022-10-27 10:15:10', 88);
INSERT INTO public.orders VALUES (6, 6, 3, 3, '2022-10-27 10:15:46', 88);


--
-- Name: cakes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cakes_id_seq', 7, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 7, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 6, true);


--
-- Name: cakes cakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes
    ADD CONSTRAINT cakes_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: orders orders_cakeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES public.cakes(id);


--
-- Name: orders orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- PostgreSQL database dump complete
--

