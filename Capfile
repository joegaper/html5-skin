# default deploy_config_path is 'config/deploy.rb'
set :deploy_config_path, 'cap/deploy.rb'
# default stage_config_path is 'config/deploy'
set :stage_config_path, 'cap/deploy'

# Load DSL and Setup Up Stages
require 'capistrano/setup'

# Includes default deployment tasks
require 'capistrano/deploy'

# Loads custom tasks from `lib/capistrano/tasks' if you have any defined.
Dir.glob('lib/capistrano/tasks/*.cap').each { |r| import r }
