// pipeline {
//     agent any
//     stages {
//         stage('Clone'){
//             steps {
//                 git 'https://github.com/PhapLu/jenkins-devops.git'
//             }
//         }
//         stage('Clone'){
//             steps {
//                 withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
//                 sh 'docker build -t adamlil2404/nodejs-test:v10 .'
//                 sh 'docker push adamlil2404/nodejs-test:v10'
//                 }
//             }
//         }
//     }
// }

pipeline {
    agent { 
        any
      }
    triggers {
        pollSCM('H/5 * * * *')
    }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                echo "doing build stuff.."
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                echo "doing test stuff.."
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}