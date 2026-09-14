import _ from "lodash";

import { Eyebrow } from "@screenComponent/home/eyebrow";
import { products } from "@screenComponent/home/homeData";

export default function MaterialsSection() {
  return (
    <section
      className="bg-[#f5f6f0] px-[7vw] py-14 sm:py-20 lg:py-28"
      id="materials"
    >
      <div>
        <Eyebrow>01 / The collection</Eyebrow>
        <div className="mt-8 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl text-[clamp(2.25rem,9vw,2.8rem)] sm:text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.055em]">
            Considered forms.
            <br />
            <span className="text-[#92998a]">Endless potential.</span>
          </h2>
          <p className="max-w-xs text-base leading-7 text-[#728064]">
            The right material changes everything. Discover yours.
          </p>
        </div>
      </div>
      <div className="mt-9 border-b sm:mt-14 border-black/10 lg:mt-20">
        {_.map(products, (product, index) => (
          <article
            className="group grid grid-cols-[1.5rem_minmax(0,1fr)] sm:grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4 border-t border-black/10 py-7 lg:grid-cols-[5rem_1.1fr_1fr] lg:gap-7 lg:py-10"
            id={product.id}
            key={product.name}
          >
            <span className="text-2xl tracking-[-0.08em] text-[#a5af9a] lg:text-4xl">
              0{index + 1}
            </span>
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.04em] lg:text-3xl">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-[#77866a]">{product.label}</p>
            </div>
            <details className="col-start-2 row-start-2 max-w-sm lg:col-start-3 lg:row-start-1">
              <summary className="flex min-h-11 max-w-44 cursor-pointer list-none items-center justify-between py-2 text-sm text-[#5e6f50]">
                About this block <span className="text-xl">+</span>
              </summary>
              <p className="pb-3 pt-1 text-base leading-7 text-[#738166]">
                {product.text}
              </p>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
