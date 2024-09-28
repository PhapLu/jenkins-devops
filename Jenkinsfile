pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18' // Your configured Node.js version
    }
    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo" // Your Docker image name
        DOCKER_CREDENTIALS_ID = 'docker-cre' // Your Docker credentials ID
        DOCKER_HOST = "tcp://host.docker.internal:2375" // Docker Daemon exposed on TCP
        DOCKER_TLS_VERIFY = "" // Disable TLS
        DOCKER_CERT_PATH = "" // Clear certificate path
    }
    triggers {
        pollSCM('H/5 * * * *') // Poll every 5 minutes
    }
    stages {
        stage('Debug Docker Environment') {
            steps {
                // Debug the environment variables to make sure Docker is correctly set up
                sh 'echo "DOCKER_HOST=$DOCKER_HOST"'
                sh 'echo "DOCKER_TLS_VERIFY=$DOCKER_TLS_VERIFY"'
                sh 'echo "DOCKER_CERT_PATH=$DOCKER_CERT_PATH"'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('server') { 
                    echo 'Installing Node.js dependencies...'
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('server') { 
                    echo 'Building the app for production...'
                    sh 'npm run build'
                }
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    echo 'Building and pushing Docker image...'
                    docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_CREDENTIALS_ID}") {
                        // Build the Docker image and tag it with the build ID
                        def customImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                        // Push the built image to the Docker registry
                        customImage.push()
                    }
                }
            }
        }
        stage('Deploy to QA') {
            steps {
                echo 'Deploying to QA environment...'
                // Implement your QA deployment logic here
            }
        }
        stage('Test') {
            steps {
                dir('server') {
                    echo 'Running tests...'
                    // Uncomment and run the actual tests when ready
                    // sh 'npm test'
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for errors.'
        }
    }
}

// pipeline {
//     agent any
//     triggers {
//         pollSCM('H/5 * * * *')
//     }
//     stages {
//         stage('Build') {
//             steps {
//                 echo "Building.."
//                 sh '''
//                 echo "doing build stuff.."
//                 '''
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo "Testing.."
//                 sh '''
//                 echo "doing test stuff.."
//                 '''
//             }
//         }
//         stage('Deliver') {
//             steps {
//                 echo 'Deliver....'
//                 sh '''
//                 echo "doing delivery stuff.."
//                 '''
//             }
//         }
//     }
// }