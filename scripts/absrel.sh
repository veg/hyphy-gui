HYPHY_DIR=$1
LIB_PATH=$HYPHY_DIR/res
ABSREL_PATH=$HYPHY_DIR/res/TemplateBatchFiles/SelectionAnalyses/aBSREL.bf
DATA_PATH=$2
(echo 1; echo $DATA_PATH; echo 3; echo 1;) | $HYPHY_DIR/HYPHYMP LIBPATH=$LIB_PATH $ABSREL_PATH
