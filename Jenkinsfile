pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18' // Your configured Node.js version
    }
    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo" // Your Docker image name
        DOCKER_CREDENTIALS_ID = 'docker-cre' // Your Docker credentials ID
        DOCKER_HOST = "tcp://host.docker.internal:2375" // Docker Daemon exposed on TCP
        DOCKER_TLS_VERIFY = ""
        DOCKER_CERT_PATH = ""
    }
    triggers {
        pollSCM('H/5 * * * *') // Poll every 5 minutes
    }
    stages {
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
                    try {
                        // Ensure the Docker registry and credentials ID are correctly set
                        docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_CREDENTIALS_ID}") {
                            // Build the Docker image and tag it with the build ID
                            def customImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                            // Push the built image to the Docker registry
                            customImage.push()
                        }
                    } catch (Exception e) {
                        echo "Error during Docker build and push: ${e.message}"
                        throw e // This will cause the build to fail and the error to be logged
                    }
                }
            }
        }
        stage('Deploy to QA') {
            steps {
                echo 'Deploying to QA environment...'
                // Implement deployment steps or scripts
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