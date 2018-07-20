HYPHY_DIR=$1
LIB_PATH=$HYPHY_DIR/res
BATCH_FILE_PATH=$HYPHY_DIR/res/TemplateBatchFiles/SelectionAnalyses/RELAX.bf
DATA_PATH=$2
TREE_PATH=$3
GENETIC_CODE=$4
ANALYSIS_TYPE=$5

GETCOUNT=$HYPHY_DIR/../src/helpers/getAnnotatedCount.bf

echo "hello from bash"
test=3
echo $test

#count=(echo '(echo '$TREE_FN') | '$HYPHY' '$GETCOUNT'' 2> /dev/null)
#echo $count

#if[ $count -eq 2]
#then
#  echo "then block"
#else
#  echo "else block"
#fi

#(echo $GENETIC_CODE; echo $DATA_PATH; echo $TREE_PATH; echo 3; echo 1; echo $ANALYSIS_TYPE;) | $HYPHY_DIR/HYPHYMP LIBPATH=$LIB_PATH $BATCH_FILE_PATH
