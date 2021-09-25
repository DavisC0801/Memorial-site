FROM ruby:2.7.4-buster
LABEL maintainer="Christopher Davis <davisc1014@gmail.com>"

ENV PORT 3000
EXPOSE $PORT

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y gcc g++ make fonts-liberation && \
    apt-get install -y --force-yes --no-install-recommends nodejs yarn

RUN mkdir -p /tmp/rails/pids

RUN mkdir /app
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

COPY . .

RUN yarn install

CMD ["bin/rails", "s", "-b", "0.0.0.0"]
