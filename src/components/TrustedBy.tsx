"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const brands = [
  { name: "Amazon", slug: "amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Google", slug: "google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "AutoZone", slug: "autozone", url: "https://www.autozone.com/images/az-logo-full.svg" },
  { name: "PayPal", slug: "paypal", url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "LinkedIn", slug: "linkedin", url: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
  { name: "Wix", slug: "wix", url: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg" },
  { name: "Daily.Dev", slug: "dailydotdev", url: "/logos/daily-dev.png" },
  { name: "Appwrite", slug: "appwrite", url: "/logos/appwrite.png" },
  { name: "Lambdatest", slug: "lambdatest", url: "https://www.lambdatest.com/resources/images/logos/logo.svg" },
  { name: "Okta", slug: "okta", url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Okta_logo_%282023%29.svg" },
  { name: "Apollo GraphQL", slug: "apollographql", url: "https://www.apollographql.com/assets/footer/apollo-word-mark.svg" },
  { name: "BeeFree", slug: "beefree", url: "https://cdn.prod.website-files.com/64942e7300c2898fa7449d1c/677d073cc590aef85b891bdc_beefree.svg" },
  { name: "Big Commerce", slug: "bigcommerce", url: "https://dam.bigcommerce.com/m/1930bf02acf2857e/original/Commerce-Logo-Tagline-Color.svg" },
  { name: "TuxCare", slug: "tuxcare", url: "https://tuxcare.com/wp-content/themes/tuxcare-2022/assets/images/tuxcare-logo.svg" },
  { name: "Coder", slug: "coder", url: "/logos/coder.png" },
  { name: "Vonage", slug: "vonage", url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Vonage_Logo.png" },
  { name: "Yum! Brands", slug: "yumbrands", url: "https://www.yum.com/wps/wcm/connect/yumbrands/e1b2d337-ab95-41d4-afb0-5f2b6665184d/yum-bubble-2024.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_5QC4HBC039RJ406SQH4UBH3695-e1b2d337-ab95-41d4-afb0-5f2b6665184d-pdfxkPW" },
];

const BrandItem = ({ brand }: { brand: typeof brands[0] }) => (
  <li className="relative group flex flex-col items-center justify-center gap-3 min-w-[120px] flex-shrink-0">
    <div className="flex items-center justify-center h-16 w-40">
      <Image
        src={brand.url || `https://cdn.simpleicons.org/${brand.slug}`}
        alt=""
        width={120}
        height={40}
        className={`max-h-[40px] ${brand.slug === 'wix' ? 'max-w-[80px]' : 'max-w-[120px]'} w-auto h-auto object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
    <span className="text-xs md:text-sm font-bold text-[#4a5757] group-hover:text-[#2e6089] transition-colors duration-300 cursor-default select-none uppercase tracking-wider">
      {brand.name}
    </span>
  </li>
);

export const TrustedBy = () => {
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="rounded-3xl -mt-8 bg-white pt-10 md:pt-16 pb-24 md:pb-32 shadow-xl border-2 border-[#4D7DA3]/20 relative z-0"
      style={{ boxShadow: '0 -10px 30px -10px rgba(77, 125, 163, 0.3), 0 10px 30px -10px rgba(0, 0, 0, 0.1)' }}
      aria-labelledby="trusted-by-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">
        <h2 id="trusted-by-heading" className="text-center text-[#4a5757] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-8 md:mb-12">
          Trusted By Industry Leaders
        </h2>

        {shouldReduceMotion ? (
          // Static scrollable version for reduced motion preference
          <div
            ref={scrollRef}
            className="overflow-x-auto pb-4 -mb-4"
            role="region"
            aria-label="Partner logos"
            tabIndex={0}
          >
            <ul className="flex gap-8 md:gap-16 items-center list-none p-0 m-0">
              {brands.map((brand) => (
                <BrandItem key={brand.name} brand={brand} />
              ))}
            </ul>
          </div>
        ) : (
          // Animated version
          <div
            className="relative flex overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
            aria-hidden="true"
          >
            <motion.ul
              className="flex gap-16 md:gap-32 items-center whitespace-nowrap list-none p-0 m-0"
              animate={{ x: "-50%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 50,
              }}
            >
              {[...brands, ...brands].map((brand, index) => (
                <BrandItem key={`${brand.name}-${index}`} brand={brand} />
              ))}
            </motion.ul>
          </div>
        )}

        {/* Screen reader accessible list (hidden visually but announced) */}
        {!shouldReduceMotion && (
          <div className="sr-only">
            <p>Trusted by the following companies:</p>
            <ul>
              {brands.map((brand) => (
                <li key={brand.name}>{brand.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
