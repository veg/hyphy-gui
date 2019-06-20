hyphyDir=$1
dataPath=$2
treePath=$3
geneticCode=$4
analysisType=$5

GETCOUNT=$hyphyDir/../src/helpers/bfs/getAnnotatedCount.bf

output=$(echo $treePath | $hyphyDir/hyphy $GETCOUNT)
count=$(echo "${output: -1}")

if [ $count -eq 2 ]
then
  $hyphyDir/hyphy LIBPATH=$hyphyDir/res relax --alignment $dataPath --tree $treePath --code $geneticCode --models $analysisType --mode Classic --test TEST --referece-group 'Unlabeled branches' 
else
  $hyphyDir/hyphy LIBPATH=$hyphyDir/res relax --alignment $dataPath --tree $treePath --code $geneticCode --models $analysisType --mode Classic --test TEST --reference REFERENCE
fi