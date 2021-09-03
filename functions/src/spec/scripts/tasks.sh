#!/bin/bash
cd ~/provana-util/cloud-tasks-emulator && go run ./ -host localhost -port 8001 -queue projects/db-abstract/locations/us-central1/queues/no-abandoned-checkouts