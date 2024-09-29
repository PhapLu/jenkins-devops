FROM jenkins/jenkins:lts-jdk11

# Install Blue Ocean plugin
RUN jenkins-plugin-cli --plugins blueocean

# Set Jenkins home directory
ENV JENKINS_HOME /var/jenkins_home

# Set default user as 'jenkins'
USER jenkins
