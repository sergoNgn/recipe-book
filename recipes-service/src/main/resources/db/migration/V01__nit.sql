create table recipes (
    id serial primary key,
    created_at timestamp,
    updated_at timestamp,
    name varchar(100) not null,
    short_description varchar(200) not null
);

create table recipe_descriptions (
    recipe_id int primary key references recipes(id),
    data varchar(2048) not null
);

insert into recipes values
(1001, '2023-05-01T14:00:12.426403', '2023-05-01T14:00:12.426403', 'World''s Best Lasagna', 'This lasagna recipe takes a little work, but it is so satisfying and filling that it''s worth it!'),
(1002, '2023-05-01T15:00:12.426403', '2023-05-01T15:00:12.426403', 'Super-Delicious Zuppa Toscana', 'Zuppa Toscana is oh-so-good! This recipe has just the right amount of spice to keep you coming back for more!'),
(1003, '2023-05-01T16:00:12.426403', '2023-05-01T16:00:12.426403', 'Good Old-Fashioned Pancakes', 'I found this pancake recipe in my Grandma''s recipe book. Judging from the weathered look of this recipe card, this was a family favorite.'),
(1004, '2023-05-01T17:00:12.426403', '2023-05-01T17:00:12.426403', 'Dill Chicken Salad', 'This chicken salad has a bright, robust taste from the lemon dill dressing, which is a nod to another Allrecipes submission.');

insert into recipe_descriptions values
(1001, 'The Allrecipes community adores this lasagna recipe because it''s incredibly customizable, so you can easily alter the ingredient list to suit your needs. If you want to stay true to the original recipe, though, these are the ingredients you''ll need to add to your grocery list:
 · Meat: This super meaty lasagna has sweet Italian sausage and lean ground beef.
 · Onion and garlic: An onion and two cloves of garlic are cooked with the meat to add tons of flavor.
 · Tomato products: You''ll need a can of crushed tomatoes, two cans of tomato sauce, and two cans of tomato paste.
 · Sugar: Two tablespoons of white sugar add subtle sweetness and enhance the flavor of the sauce.
 · Spices and seasonings: This lasagna recipe is flavored with fresh parsley, dried basil leaves, salt, Italian seasoning, fennel seeds, and black pepper.
 · Lasagna noodles: Use store-bought or homemade lasagna noodles.
 · Cheeses: Parmesan, mozzarella, and ricotta cheese make this lasagna extra decadent.'),
(1002, 'You''ll find the full, step-by-step recipe below — but here''s a brief overview of what you can expect when you make homemade zuppa toscana:
 · Cook the Italian sausage with the red pepper flakes.
 · Cook the bacon, then cook the onion and garlic in the bacon drippings.
 · Add the broth and bring to a boil, then add the potatoes and simmer.
 · Reduce the heat and stir in the cream, cooked sausage, and spinach.'),
(1003, 'You likely already have everything you need to make this pancake recipe. If not, here''s what to add to your grocery list:
 · Flour: This homemade pancake recipe starts with all-purpose flour.
 · Baking powder: Baking powder, a leavener, is the secret to fluffy pancakes.
 · Sugar: Just a tablespoon of white sugar is all you''ll need for subtly sweet pancakes.
 · Salt: A pinch of salt will enhance the overall flavor without making your pancakes taste salty.
 · Milk and butter: Milk and butter add moisture and richness to the pancakes.
 · Egg: A whole egg lends even more moisture. Plus, it helps bind the pancake batter together.'),
(1004, 'Preheat the oven to 350 degrees F (175 degrees C). Spread pecans onto a baking sheet.
 · Toast in the preheated oven until nuts start to turn golden brown and become fragrant, about 10 minutes. Remove from oven to cool to room temperature, about 10 minutes; chop.
 · Whisk lemon juice, dill, sugar, mayonnaise and Greek yogurt together In a large bowl until smooth. Stir in celery, pecans, and shredded chicken.
 · Stir in chicken broth as needed, 1 tablespoon at a time, until salad is your preferred texture. Season to taste with salt and black pepper.');
