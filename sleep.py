import sys
from time import sleep

sys.stdout.write('I take a while...')
sys.stdout.flush()
sleep(2)
sys.stdout.write('...told you!')
