

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body>


<div>
    <!-- <button id="button">Press</button> -->
    <label for="sort">Setting</label>

    <select name="sort" id="sort" class="select-sort">
      <option value="Без сортировки">Без сортировки</option>
      <option value="Сначала дорогие">Сначала дорогие</option>
      <option value="Сначала дешевые">Сначала дешевые</option>
      <option value="По рейтингу">По рейтингу</option>
    </select>
    <label for="category">Category</label>

    <select name="category" id="category" class="select-category">
      <option value="Все категории">Все категории</option>
      <option value="Бакалея">Бакалея</option>
      <option value="Вода, напитки, соки, кофе, чай">Вода, напитки, соки, кофе, чай</option>
      <option value="Хлеб и хлебобулочные изделия">Хлеб и хлебобулочные изделия</option>
      <option value="Шоколад, конфеты, печенье и другие сладости">Шоколад, конфеты, печенье и другие сладости</option>
      <option value="Молочные продукты">Молочные продукты</option>
      <option value="Овощи, фрукты, ягоды">Овощи, фрукты, ягоды</option>
    </select>
</div>




<section class="products"></section>

<div class="product__row" id="table__product"></div>


<script type="module" src="/apiRequest.js"></script>
</body>
</html>

