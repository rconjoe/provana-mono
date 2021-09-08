#!/bin/bash
function start() {
  tmux new-session -d -s mocks 'stripe-mock'
  tmux rename-window 'mocks'
  tmux select-window -t mocks
  tmux split-window -h 'bash tasks.sh'
  echo -e "\n -------- \n \n Emulators started. To stop, run stop.sh \n \n (╯°□°）╯︵ ┻━┻ \n \n -------- \n"
}
start
