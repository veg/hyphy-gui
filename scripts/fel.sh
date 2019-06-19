hyphyDir=$1
dataPath=$2
treePath=$3
geneticCode=$4
echo $5
synRateVariation=$5
$hyphyDir/hyphy LIBPATH=$hyphyDir/res fel --alignment $dataPath --tree $treePath --code $geneticCode --srv Yes