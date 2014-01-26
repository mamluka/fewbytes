#!/usr/bin/env ruby

require 'redis'
require 'thor'
require 'json'

class Cli < Thor

  desc 'debug', 'You can listed to RSS updates from the server'
  option :json, type: :boolean

  def debug
    $stdout.puts 'Now listening for document updates'
    redis = Redis.new(:timeout => 0)

    redis.subscribe('items', 'feeds') do |on|
      on.message do |channel, msg|
        data = JSON.parse msg
        case channel
          when 'items'
            $stdout.puts options[:json] ? data : "New RSS discovered: Title: #{data['title']}, feedId: #{data['feedId']}"
          when 'feeds'
            $stdout.puts options[:json] ? data : "Feed #{data['url']} was #{data['action'].upcase}"
        end
      end
    end
  end
end

Cli.start