<?
/*
 Template Name: "красная цена test"
 * */

get_header();?>
<?while ( have_posts() ) : the_post();?>
    <?get_template_part( 'content', get_post_format() );?>
<?endwhile;?>
  <div class="breadcrumbs" itemscope="" itemtype="http://schema.org/BreadcrumbList">
                    <ul>
                        <?if(function_exists('bcn_display')){
                            bcn_display();
                        }?>
                    </ul>
                </div>
<div class="content-row">
    <div class="main main--full-width main--padding">
        <div class="filter">
            <!--<a class="filter__link filter__link--active"  href="http://evroopt.razrabotka.by/<?/*= get_field( "link_on_journal");*/?>" target="_blank" download>Все товары</a>-->

            <?php $params = (array(
                'fallback_cb'     => 'wp_page_menu',
                'theme_location' => 'top_red_price',
                'container' => '',
                'echo' => 'false',
                'menu_class' => '',
                'menu_id' => '',
                'depth'=> 1,
                'items_wrap' => '%3$s',
                'walker' => new Description_Walker,
                ) );
            print strip_tags(wp_nav_menu( $params ), '<a>' );?>
<!--<a class="journal__link pdf-red journal__link--green pdf-red" href="https://evroopt.by/krasnaya-tsena-gipermarkety/" target="_blank">
                <img style="height: 30px;" src="<?=$GLOBALS['template_url']?>/img/pdf-black-icon-big.png" alt="Скачать список акционных товаров">
                <p>Красная цена в гипермаркетах «Евроопт»</p>-->
            </a>
            <a class="journal__link journal__link--green" href="<?=$GLOBALS['site_url']?>/wp-content<?= get_field( "link_on_journal");?>" target="_blank" download>
                <img src="<?=$GLOBALS['template_url']?>/img/pdf-green-icon.jpg" alt="Скачать список акционных товаров">
                <p>Скачать список акционных товаров</p>
            </a>

            <?php if($link_on_visa = get_post_meta($post->ID, 'link_on_visa', true)){ ?>

 <a class="journal__link journal__link--blue" href="<?=$GLOBALS['site_url']?>/wp-content<?= get_field( "link_on_visa");?>" target="_blank" >
    <img src="<?=$GLOBALS['template_url']?>/img/pdf_white.png" width="17px;" alt="Бонусы с Visa">
    <p>Бонусы с Visa</p>
</a>

            <?php } ?>    
                    
        </div>
        <div class="product product--akcia" id="ajax-products-container">
            <div class="product__row">
			                            <div class="product__el">
                                <div class="product-preview">
                                    <div class="product-preview__img">
                                        <img src="<?=$GLOBALS['template_url']?>/img/red-price.png" alt="Красная цена">
                                    </div>
										<!--<p>ТОЛЬКО В СУПЕРМАРКЕТАХ (SUPER), МАРКЕТАХ (MARKET) И МИНИМАРКЕТАХ </p>-->
                                    <div class="product-preview__time"><?= get_field( "data_kc");?></div>
                          <a class="product-preview__download" href="<?=$GLOBALS['site_url']?>/wp-content<?= get_field( "link_on_journal");?>" target="_blank" download>
                                        <img src="<?=$GLOBALS['template_url']?>/img/pdf-icon.jpg" alt="Скачать список акционных товаров">
                                        <p class="download_red_price">Скачать список товаров</p>
                                    </a><br>
									  <a class="product-preview__download" href="<?=$GLOBALS['site_url']?>/wp-content<?= get_field( "link_on_listovka");?>" target="_blank" download>
                                        <img src="<?=$GLOBALS['template_url']?>/img/pdf-icon.jpg" alt="Скачать список акционных товаров">
                                        <p class="download_red_price">Скачать журнал</p>
                                    </a>
                                </div>
                            </div>
                <?
                $args = array(
                    'post_type' => 'product',
                    'order'    => 'ASC', //сортировка
                'product_cat' => 'milk_prod',
                );
                $products = new WP_Query( $args );
                $max_pages = $products->max_num_pages; // узнаем общее количество страниц постов
                // Цикл акционных товаров
                if ( $products->have_posts() ) {
                    //print_r($query);
                    while ( $products->have_posts() ) {
                        $products->the_post();

                        $red_price = get_field( "banner_red_price");
                        $old_price = get_field( "old_price");
                        $new_price = get_field( "new_price");
                        $image = get_field( "image");
                        $test_test = get_field( "test_test");
                        $journal = get_field( "link_on_journal_product");?>

                        <?if($red_pri){?>

                            <div class="product__el">
                                <div class="product-preview">
                                    <div class="product-preview__img">
                                        <img src="<?=$GLOBALS['template_url']?>/img/red-price.png" alt="Красная цена">
                                    </div>
                                    <div class="product-preview__time"><? the_title(); ?></div>
                                    <a class="product-preview__download" href="http://evroopt.razrabotka.by/<?= $journal?>" target="_blank" download>
                                        <img src="<?=$GLOBALS['template_url']?>/img/pdf-icon.jpg" alt="Скачать список акционных товаров">
                                        <p class="download_red_price">Скачать список товаров</p>
                                    </a>
                                </div>
                            </div>
                        <?}else{?>


             <div class="product__el tovar">
                                <a class="product__hover" href="#">
                                    <p><? the_title(); ?></p>
                                </a>
									<a class="el" href="<? the_permalink(); ?>">
                                <div class="product-preview">
                                    <div class="product-preview__img">
                                        <?php the_post_thumbnail("thumbnail-215x300"); ?>
                                    </div>
                                    <div class="product-preview__desc"><? the_title(); ?></div>
                                    <div class="product-preview-price product-preview-price--akcia">
      <div class="product-preview-price__new" data-discont=""> <span class="data-discont"><?php the_excerpt(); ?></span> </div> 
										 <div class="product-preview-price__old">product-preview-price__old  </div>
									
                                    </div>
                                </div>
									</a>
                            </div>



                            <?}?>
                    <? } ?>

                <? } ?>



            </div>
			       <div class="small-container-1000">
                <?php while( have_posts() ) : the_post();
                    $more = 1; // отображаем полностью всё содержимое поста
                    the_content(); // выводим контент
                endwhile; ?>
            </div>
        </div>
			
    </div>
</div>
</div>


<div>
    <!-- <button id="button__test">Press</button> -->
    <label for="sort">Setting</label>

    <select name="sort" id="sort" class="select-sort map-vacancy" style="
    min-height: auto;">
      <option value="Без сортировки">Без сортировки</option>
      <option value="Сначала дорогие">Сначала дорогие</option>
      <option value="Сначала дешевые">Сначала дешевые</option>
      <option value="По рейтингу">По рейтингу</option>
    </select>
    <label for="category">Category</label>

    <select name="category" id="category" class="select-category map-vacancy" style="
    min-height: auto;">
      <option value="Все категории">Все категории</option>
      <option value="Бакалея">Бакалея</option>
      <option value="Вода, напитки, соки, кофе, чай">Вода, напитки, соки, кофе, чай</option>
      <option value="Хлеб и хлебобулочные изделия">Хлеб и хлебобулочные изделия</option>
      <option value="Шоколад, конфеты, печенье и другие сладости">Шоколад, конфеты, печенье и другие сладости</option>
      <option value="Молочные продукты">Молочные продукты</option>
      <option value="Овощи, фрукты, ягоды">Овощи, фрукты, ягоды</option>
    </select>
</div>

<div class="product__row" id="table__product"></div>


<script src="<?= $GLOBALS['template_url'] ?>/apiRequest.js"></script>

<? get_footer(); ?>