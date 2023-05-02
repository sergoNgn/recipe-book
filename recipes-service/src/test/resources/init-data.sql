insert into recipes (id, created_at, updated_at, name, short_description) values
(101, '2023-05-01T14:00:12.426403', '2023-05-01T14:00:12.426403', 'Recipe #1', 'Recipe short description #1'),
(102, '2023-06-01T14:00:12.426403', '2023-06-01T14:00:12.426403', 'Recipe #2', 'Recipe short description #2'),
(103, '2023-07-01T14:00:12.426403', '2023-07-01T14:00:12.426403', 'Recipe #3', 'Recipe short description #3'),
(104, '2023-08-01T14:00:12.426403', '2023-08-01T14:00:12.426403', 'Recipe #4', 'Recipe short description #4'),
(105, '2023-09-01T14:00:12.426403', '2023-09-01T14:00:12.426403', 'Recipe #5', 'Recipe short description #5');

insert into recipe_descriptions (recipe_id, data) values
(101, 'Recipe description #1'),
(102, 'Recipe description #2'),
(103, 'Recipe description #3'),
(104, 'Recipe description #4'),
(105, 'Recipe description #5');