fscanf (PROMPT_FOR_FILE,"Raw",treeString);
Topology T = treeString;
GetInformation(modelMap, T);
modelList = Columns(modelMap);
fprintf(stdout, Abs(Columns(modelList)));
