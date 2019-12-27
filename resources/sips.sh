#!/bin/bash
# This script translates some SIPS (scriptable image processing system) commands to ImageMagick.
# http://www.unix.com/man-page/all/1/sips

input=""
output=""
convertoption=""

while :
do
  case $1 in
    # Crop image to fit specified size.
    -c|--cropToHeightWidth)
        convertoption="$convertoption -crop $2x$3!"; shift 3;;
    # Flipping.
    -f|--flip)
        case $2 in
          horizontal)
            convertoption="$convertoption -flop"; shift;;
          vertical)
            convertoption="$convertoption -flip"; shift;;
        esac
        shift;;
    # Resample image to specified width.
    --resampleWidth)
        convertoption="$convertoption -resize $2x"; shift 2;;
    # Resample image to specified height.
    --resampleHeight)
        convertoption="$convertoption -resize x$2"; shift 2;;
    # Resample image at specified size. Image apsect ratio may be altered.
    -z|--resampleHeightWidth)
        convertoption="$convertoption -resize $2x$3!"; shift 3;;
    # Resample image so height and width aren't greater than specified size.
    -Z|--resampleHeightWidthMax)
        convertoption="$convertoption -resize $2x$2"; shift 2;;
    # Rotating.
    -r|--rotate)
        convertoption="$convertoption -rotate $2"; shift 2;;
    # Set a property value for key to value.
    -s|--setProperty)
        case $2 in
          formatOptions)
            convertoption="$convertoption -quality $3"; shift 2;;
        esac
        shift;;
    # Output path
    --out)
        output=$2; shift 2;;
    # Input path
    *)
        if [ -z "$input" ]; then
          input=$1; shift
        else # No more options. Stop while loop.
          break
        fi
        ;;
    --) # End of all options
        shift
        break
        ;;
  esac
done

if ! [ -e $input ]; then
  echo "Input file does not exist."
  exit 1
fi

if [ -e $output ]; then
  output=$input
fi

echo convert $input $convertoption $output
convert $input $convertoption $output

exit 0
