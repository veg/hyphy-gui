HYPHY_DIR=$1
LIB_PATH=$HYPHY_DIR/res
BATCH_FILE_PATH=$HYPHY_DIR/res/TemplateBatchFiles/SelectionAnalyses/RELAX.bf
DATA_PATH=$2
TREE_PATH=$3
GENETIC_CODE=$4
ANALYSIS_TYPE=$5

GETCOUNT=$HYPHY_DIR/../src/helpers/bfs/getAnnotatedCount.bf

output=$(echo $TREE_PATH | $HYPHY_DIR/HYPHYMP $GETCOUNT)
count=$(echo "${output: -1}")

if [ $count -eq 2 ]
then
  (echo $GENETIC_CODE; echo $DATA_PATH; echo $TREE_PATH; echo 2; echo $ANALYSIS_TYPE;) | $HYPHY_DIR/HYPHYMP LIBPATH=$LIB_PATH $BATCH_FILE_PATH
else
  (echo $GENETIC_CODE; echo $DATA_PATH; echo $TREE_PATH; echo 3; echo 2; echo $ANALYSIS_TYPE;) | $HYPHY_DIR/HYPHYMP LIBPATH=$LIB_PATH $BATCH_FILE_PATH
fi
