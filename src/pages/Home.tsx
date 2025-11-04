import React, { type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
type FeatureProps = { icon: ReactNode; title: string; body: string };

const centerCardStyle: CSSProperties = { textAlign: "center" };
const iconRowStyle: CSSProperties = { display: "flex", justifyContent: "center", marginBottom: 12 };

const Feature: React.FC<FeatureProps> = ({ icon, title, body }) => (
  <div className="card" style={centerCardStyle}>
    <div style={iconRowStyle}>
      <div className="feature-icon">{icon}</div>
    </div>
    <h3 style={{ margin: "4px 0 8px" }}>{title}</h3>
    <p className="small" style={{ margin: 0 }}>{body}</p>
  </div>
);

const Hero: React.FC = () => (
  <section id="home" className="hero container">
    <div className="grid hero-grid">
      <div>
        <span className="chip">Aldo Website UI</span>
        <h1 className="hero-title">
          Digital Solutions for
          <br />
          <span className="accent"> Startup, SaaS, Business, Agency</span>
        </h1>
        <p className="small" style={{ maxWidth: 560 }}>
          Handcrafted React + TypeScript template for your next Startup, Business, Agency or SaaS website. Clean design and ready-to-use components.
        </p>
        <div className="row" style={{ marginTop: 16 }}>
          <a href="#features" className="btn primary">Get Started</a>
          <a href="#about" className="btn">How it Works</a>
        </div>
      </div>
      <div className="hero-art" aria-hidden>
        <div className="blob a" />
        <div className="blob b" />
        <div className="panel" style={{ height: 220 }} />
      </div>
    </div>
  </section>
);

const Home: React.FC = () => {
  return (
    <div>
      <Hero />

      <section id="features" className="container">
        <div className="section-head">
          <span className="title">FEATURES</span>
          <h2 className="section-title">Our Unique & Awesome Core Features</h2>
          <p className="small" style={{ maxWidth: 620, margin: "0 auto" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.
          </p>
        </div>
        <div className="grid features-grid">
          <Feature
            icon={<svg width="44" height="44" viewBox="0 0 44 44" className="fill-current"><path d="M3.66663 23.8333H14.6666V38.5H3.66663V23.8333ZM16.5 5.5H27.5V38.5H16.5V5.5Z" /><path opacity=".5" d="M29.3333 14.6667H40.3333V38.5H29.3333V14.6667Z"/></svg>}
            title="Crafted for Startups"
            body="Built with sensible defaults and a clean visual style to get you shipping faster."
          />
          <Feature
            icon={<svg width="44" height="44" viewBox="0 0 44 44" className="fill-current"><path d="M22.942 2.4L39.022 12.047a1 1 0 010 1.737L22 23.833 4.978 13.784a1 1 0 010-1.737L21.056 2.4A3 3 0 0122.942 2.4Z"/><path opacity=".5" d="M36.819 19.25L39.022 20.572a1 1 0 010 1.737L22 32.358 4.978 22.309a1 1 0 010-1.737l2.203-1.321L22 28.142 36.819 19.25Z"/></svg>}
            title="High-quality Design"
            body="Typography, spacing, and color tuned for a modern dark UI."
          />
          <Feature
            icon={<svg width="44" height="44" viewBox="0 0 44 44" className="fill-current"><path d="M36.667 40.333H7.333a2 2 0 01-2-2V14.667h33V38.333a2 2 0 01-2 2Zm-23.834-20.166V27.5h7.334V20.167h-7.334Zm0 11V34.833h18.334V31.167H12.833Zm11-9.167V25.667h7.333V22h-7.333Z"/><path opacity=".5" d="M38.5 11H5.5V5.5a2 2 0 012-2h29.333a2 2 0 012 2V11Z"/></svg>}
            title="Essential Sections"
            body="Hero, features, CTA and more – easy to extend for your needs."
          />
          <Feature
            icon={<svg width="44" height="44" viewBox="0 0 44 44" className="fill-current"><path d="M22 3.667c10.125 0 18.333 8.208 18.333 18.333S32.125 40.333 22 40.333 3.667 32.125 3.667 22 11.875 3.667 22 3.667Zm0 3.666C13.9 7.333 7.333 13.9 7.333 22S13.9 36.667 22 36.667 36.667 30.1 36.667 22 30.1 7.333 22 7.333Z"/><path opacity=".5" d="M22 9.167c1.866 0 3.639.398 5.24 1.115l-2.866 2.864a12.05 12.05 0 00-2.374-.313C16.938 12.833 12.833 16.938 12.833 22c0 2.53 1.027 4.821 2.684 6.482L12.925 31.075c-2.152-2.295-3.472-5.384-3.472-8.775 0-7.088 5.746-12.833 12.547-12.833Z"/></svg>}
            title="Speed Optimized"
            body="Vite + React + TypeScript for instant dev experience and fast builds."
          />
          <Feature
            icon={<svg width="44" height="44" viewBox="0 0 44 44" className="fill-current"><path d="M25.667 38.5H7.333a2 2 0 01-2-2V18.333h20.334V38.5ZM38.5 14.667H5.5V7.333a2 2 0 012-2h29.334a2 2 0 012 2v7.334Z"/><path opacity=".5" d="M29.333 38.5V18.333H38.5V36.667a2 2 0 01-2 2h-7.167Z"/></svg>}
            title="Fully Customizable"
            body="Simple CSS tokens, flexible components and clean code."
          />
          <Feature
            icon={<svg width="44" height="44" viewBox="0 0 44 44" className="fill-current"><path opacity=".5" d="M10.015 8.127C13.342 5.245 17.598 3.66 22 3.667 32.125 3.667 40.333 11.875 40.333 22c0 3.916-1.228 7.546-3.318 10.523L31.167 22H36.667c.0003-2.875-.845-5.687-2.43-8.086-1.586-2.399-3.84-4.279-6.485-5.406-2.645-1.127-5.563-1.452-8.391-.934-2.829.518-5.443 1.856-7.517 3.847l-1.828-3.291Z"/><path d="M33.984 35.873C30.658 38.756 26.402 40.34 22 40.333 11.874 40.333 3.667 32.125 3.667 22c0-3.916 1.229-7.546 3.319-10.523L12.833 22h-5.5c-.00024 2.875.84471 5.687 2.42978 8.086 1.58508 2.399 3.84038 4.279 6.48542 5.406 2.645.127 5.563-.198 8.391-.716 2.829-.518 5.443-1.856 7.517-3.847l1.828 3.291Z"/></svg>}
            title="Regular Updates"
            body="Easily extend with new sections and improvements over time."
          />
        </div>
      </section>

      <section id="about" className="container">
        <div className="panel">
          <div className="header">
            <h2 style={{ margin: 0 }}>About Us</h2>
            <Link to="/signup" className="btn primary">Get Started</Link>
          </div>
          <p className="small">
            We are a creative digital team crafting beautiful products with TypeScript and React. This starter shows a clean dark look, structured components, and Auth0 integration to get you going.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
