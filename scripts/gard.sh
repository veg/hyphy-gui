hyphyDir=$1
dataPath=$2
geneticCode=$3
substitutionModel=$4
dataType=$5
rateVariation=$6
rateClasses=$7

# To be changed after gard and bgm keyword args are made consistent (https://github.com/veg/hyphy/pull/985)
if [ $dataType = 'nucleotide' ]
then
  dataType=Nucleotide
fi
if [ $dataType = 'codon' ]
then
  dataType=Codon
fi
if [ $dataType = 'amino-acid' ]
then
  dataType=Protein
fi

# Test if geneticCode or substitutionModel are defined... if not asign them to placeholder values
if [ -z $geneticCode ]
then
  geneticCode='Universal'
fi
if [ -z $substitutionModel ]
then
  substitutionModel='LG'
fi

$hyphyDir/hyphy LIBPATH=$hyphyDir/res gard --alignment $dataPath --type $dataType --code $geneticCode --baseline_model $substitutionModel --rv $rateVariation --rate-classes $rateClasses

