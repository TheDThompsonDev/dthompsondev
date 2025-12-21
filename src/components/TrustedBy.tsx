"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { name: "Amazon", slug: "amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Google", slug: "google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "AutoZone", slug: "autozone", url: "https://www.autozone.com/images/az-logo-full.svg" },
  { name: "PayPal", slug: "paypal", url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "LinkedIn", slug: "linkedin", url: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
  { name: "Wix", slug: "wix", url: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg" },
  { name: "Daily.Dev", slug: "dailydotdev", url: "/logos/daily-dev.png" }, // Using local uploaded image
  { name: "Appwrite", slug: "appwrite", url: "/logos/appwrite.png" }, // Using local uploaded image
  { name: "Lambdatest", slug: "lambdatest", url: "https://www.lambdatest.com/resources/images/logos/logo.svg" },
  { name: "Okta", slug: "okta", url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Okta_logo_%282023%29.svg" },
  { name: "Apollo GraphQL", slug: "apollographql", url: "https://www.apollographql.com/assets/footer/apollo-word-mark.svg" },
  { name: "BeeFree", slug: "beefree", url: "https://cdn.prod.website-files.com/64942e7300c2898fa7449d1c/677d073cc590aef85b891bdc_beefree.svg" },
  { name: "Big Commerce", slug: "bigcommerce", url: "https://dam.bigcommerce.com/m/1930bf02acf2857e/original/Commerce-Logo-Tagline-Color.svg" },
  { name: "TuxCare", slug: "tuxcare", url: "https://tuxcare.com/wp-content/themes/tuxcare-2022/assets/images/tuxcare-logo.svg" },
  { name: "Coder", slug: "coder", url: "/logos/coder.png" }, // Using local uploaded image
  { name: "Vonage", slug: "vonage", url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Vonage_Logo.png" },
  { name: "Yum! Brands", slug: "yumbrands", url: "https://www.yum.com/wps/wcm/connect/yumbrands/e1b2d337-ab95-41d4-afb0-5f2b6665184d/yum-bubble-2024.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_5QC4HBC039RJ406SQH4UBH3695-e1b2d337-ab95-41d4-afb0-5f2b6665184d-pdfxkPW" },
];

export const TrustedBy = () => {
  return (
    <section
      className="rounded-3xl -mt-8 bg-white pt-10 md:pt-16 pb-24 md:pb-32 shadow-xl border-2 border-[#4D7DA3]/20 relative z-0"
      style={{ boxShadow: '0 -10px 30px -10px rgba(77, 125, 163, 0.3), 0 10px 30px -10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">
        <h3 className="text-center text-[#153230]/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-8 md:mb-12">
          Trusted By Industry Leaders
        </h3>

        <div
          className="relative flex overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <motion.div
            className="flex gap-16 md:gap-32 items-center whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 50,
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="relative group flex flex-col items-center justify-center gap-3 min-w-[120px]"
              >
                <div className="flex items-center justify-center h-16 w-40">
                  <Image
                    src={brand.url || `https://cdn.simpleicons.org/${brand.slug}`}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={40}
                    className={`max-h-[40px] ${brand.slug === 'wix' ? 'max-w-[80px]' : 'max-w-[120px]'} w-auto h-auto object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      // If image fails, we rely on the text below
                    }}
                  />
                </div>
                <span className="text-xs md:text-sm font-bold text-[#153230]/40 group-hover:text-[#4D7DA3] transition-colors duration-300 cursor-default select-none uppercase tracking-wider">
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
