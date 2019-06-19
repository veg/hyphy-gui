hyphyDir=$1
dataPath=$2
treePath=$3
substitutionModel=$4
posteriorEstimationMethod=${11}
gridPoints=$5
chainLength=$6
mcmcChains=$7
burnIn=$8
samples=$9
concDirichletPrior=${10}

if [ $posteriorEstimationMethod == "VariationalBayes" ]
then
  $hyphyDir/hyphy LIBPATH=$hyphyDir/res fade --alignment $dataPath --tree $treePath --model $substitutionModel --branches "FG" --method $posteriorEstimationMethod --grid $gridPoints --concentration_parameter $concDirichletPrior
else
  $hyphyDir/hyphy LIBPATH=$hyphyDir/res fade --alignment $dataPath --tree $treePath --model $substitutionModel --branches "FG" --method $posteriorEstimationMethod --grid $gridPoints --concentration_parameter $concDirichletPrior --chaings $mcmcChains --chain-length $chainLength --burn-in $burnIn --samples $samples
fi
