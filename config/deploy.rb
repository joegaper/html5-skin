set :application, 'TGR'
set :repo_url, 'git@github.com:joegaper/html5-skin.git'

set :origin, "origin"
set :user, "deploy"
set :use_sudo, false

set :scm, :git

set :shared_path, "#{deploy_to}/shared/"
set :release_path, "#{deploy_to}/current/"


#set :ssh_options, {
#   verbose: :debug
#}


set :format, :pretty
set :log_level, :debug
set :pty, true


set :linked_dirs, %w{ }
set :linked_files, %w{ }


set :keep_releases, 30

#after "deploy:install", "deploy:set_env"
