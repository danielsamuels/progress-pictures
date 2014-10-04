from django.core.signing import Signer


def handle_album_post_save(sender, instance, **kwargs):
    if instance.url_title:
        return

    signer = Signer(salt='album__url_title')

    hash_base = '{}-{}'.format(
        instance.user.pk,
        instance.pk
    )

    _, hashed = signer.sign(hash_base).split(':', 1)

    instance.url_title = hashed
    instance.save()


def handle_image_post_save(sender, instance, **kwargs):
    if instance.url_title:
        return

    signer = Signer(salt='image__url_title')

    hash_base = '{}-{}-{}'.format(
        instance.album.user.pk,
        instance.album.pk,
        instance.pk
    )

    _, hashed = signer.sign(hash_base).split(':', 1)

    instance.url_title = hashed
    instance.save()
