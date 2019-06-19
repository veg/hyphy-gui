hyphyDir=$1
dataPath=$2
treePath=$3
geneticCode=$4
$hyphyDir/hyphy LIBPATH=$hyphyDir/res meme --alignment $dataPath --tree $treePath --code $geneticCode