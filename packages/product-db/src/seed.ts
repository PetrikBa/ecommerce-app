import 'dotenv/config';
import { prisma } from './client';

async function main() {
  // Ensure categories exist
  await prisma.category.createMany({
    data: [
      { name: 'T-Shirts', slug: 't-shirts' },
      { name: 'Shoes', slug: 'shoes' },
      { name: 'Jeans', slug: 'jeans' },
    ],
    skipDuplicates: true,
  });

  const products = [
    {
      name: 'Adidas CoreFit T-Shirt',
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 3990,
      sizes: ['s', 'm', 'l', 'xl', 'xxl'],
      colors: ['gray', 'purple', 'green'],
      images: { gray: '/products/1g.png', purple: '/products/1p.png', green: '/products/1gr.png' },
      categorySlug: 't-shirts',
    },
    {
      name: 'Puma Ultra Warm Zip',
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 5990,
      sizes: ['s', 'm', 'l', 'xl'],
      colors: ['gray', 'green'],
      images: { gray: '/products/2g.png', green: '/products/2gr.png' },
      categorySlug: 't-shirts',
    },
    {
      name: 'Nike Air Essentials Pullover',
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 6990,
      sizes: ['s', 'm', 'l'],
      colors: ['green', 'blue', 'black'],
      images: { green: '/products/3gr.png', blue: '/products/3b.png', black: '/products/3bl.png' },
      categorySlug: 't-shirts',
    },
    {
      name: 'Nike Dri Flex T-Shirt',
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 2990,
      sizes: ['s', 'm', 'l'],
      colors: ['white', 'pink'],
      images: { white: '/products/4w.png', pink: '/products/4p.png' },
      categorySlug: 't-shirts',
    },
    {
      name: 'Under Armour StormFleece',
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 4990,
      sizes: ['s', 'm', 'l'],
      colors: ['red', 'orange', 'black'],
      images: { red: '/products/5r.png', orange: '/products/5o.png', black: '/products/5bl.png' },
      categorySlug: 't-shirts',
    },
    {
      name: 'Nike Air Max 270',
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 5990,
      sizes: ['40', '42', '43', '44'],
      colors: ['gray', 'white'],
      images: { gray: '/products/6g.png', white: '/products/6w.png' },
      categorySlug: 'shoes',
    },
    {
      name: 'Nike Ultraboost Pulse',
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 6990,
      sizes: ['40', '42', '43'],
      colors: ['gray', 'pink'],
      images: { gray: '/products/7g.png', pink: '/products/7p.png' },
      categorySlug: 'shoes',
    },
    {
      name: "Levi's Classic Denim",
      shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      description: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
      price: 5990,
      sizes: ['s', 'm', 'l'],
      colors: ['blue', 'green'],
      images: { blue: '/products/8b.png', green: '/products/8gr.png' },
      categorySlug: 'jeans',
    },
  ];

  for (const product of products) {
    const created = await prisma.product.create({ data: product });
    console.log(`Created product: ${created.name} (id: ${created.id})`);
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
