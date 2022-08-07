from PIL import Image
import os, sys
path = os.path.dirname(os.path.realpath(__file__))
print(path)
dirs = os.listdir( path )
max_size = (100, 100)

def resize_aspect_fit():
    for item in dirs:
        if item == '.DS_Store':
            continue
        if item == 'img-resize.py':
            continue
        im = Image.open(path + "/" + item)
        f, e = os.path.splitext(path + "/" + item)
        im.thumbnail(max_size)
        if im.mode in ("RGBA", "P"): im = im.convert("RGB")
        im.save(f + '.jpg', 'JPEG', quality=90)
resize_aspect_fit()