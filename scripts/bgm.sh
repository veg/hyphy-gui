hyphyDir=$1
dataPath=$2
treePath=$3
geneticCode=$4
substitutionModel=$5
dataType=$6
chainLength=$7
burnInSamples=$8
samplesFromEachChain=$9
maximumParents=${10}
minimumSubstitutions=${11}

$hyphyDir/hyphy LIBPATH=$hyphyDir/res bgm --alignment $dataPath --tree $treePath --run_type $dataType --branches FG --code $geneticCode --baseline_model $substitutionModel --steps $chainLength --burn-in $burnInSamples --samples $samplesFromEachChain --max-parents $maximumParents --min-subs $minimumSubstitutions 

