set :stage, :production
set :server_env, 'production'

set :branch, 'tgr'
set :tmp_dir, '/home/deploy/tmp/capistrano'

set :deploy_to, "/var/www/player"

## nx01.tetongravity.com ##
server '146.20.41.5', user: 'deploy', roles: %w{web app}
