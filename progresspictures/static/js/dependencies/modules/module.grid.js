var GridModule = {

    init: function() {
        console.debug('GridModule: Initialising.');
        this.bindElements();
    },

    bindElements: function() {
        console.debug('GridModule: Binding elements.');
        $('.header__title, .image-grid__image').on('click', function() {
            console.debug('GridModule: Click event.');
            $(this).trigger('image-grid__clicked');
        }).on('image-grid__clicked', GridModule.loadCategory);
    },

    loadCategory: function(event) {
        console.debug('GridModule: Loading category.');

        $item = $(event.target).parents('.image-grid__item');
        $item.addClass('loading');

        $('.image-grid').addClass('category-loading');

        // If this item isn't the first on the page, then we need to animate it to the top left.
        console.debug('GridModule: Item index: ' + $item.index());
        if ($item.index() > 0) {
            var change_x = 0,
                change_y = 0;

            // If it's between 1 and 3, then we know it's on the first line, so we only need to animate the X value.
            // If it's over 4, we need to animate both the X and the Y value.

            // 0 1 2 3
            // 4 5 6 7
            // We move -X by (index % 4) * <item width + margin>
            change_x = -($item.index() % 4) * ($item.width() + 30);

            // We move -Y by floor(index/4) * <item height + margin>
            change_y = -(Math.floor($item.index() / 4) * ($item.height() + 32));

            $item.css('-webkit-transform', 'translateX(' + change_x + 'px) translateY(' + change_y + 'px)');
        }

        setTimeout(function() {
            $item.addClass('loaded').removeClass('loading');

            // Fan out all of the images.
            $('.image-grid__image', $item).each(function() {
                // Use the same logic as the pull.
                var change_x = 0,
                    change_y = 0;

                change_x = ($(this).index() % 4) * ($(this).width() + 30);
                change_y = (Math.floor($(this).index() / 4)) * ($(this).height() + 32);

                $(this).css('-webkit-transform', 'translateX(' + change_x + 'px) translateY(' + change_y + 'px)');
            });
        }, 1400);

    }

}
