pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18' // This is the name you configured in Global Tool Configuration
    }

    environment {
        DOCKER_IMAGE = "adamlil2404/nodejs-ci-cd-demo" // Replace with your Docker image name
        DOCKER_REGISTRY = 'https://index.docker.io/v1/' // Docker Hub registry URL (default)
        DOCKER_CREDENTIALS_ID = 'docker-hub' // Replace with your Docker credentials ID
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('server') { // Change directory to 'server'
                    echo 'Installing Node.js dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('server') { // Change directory to 'server'
                    echo 'Building the app for production...'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    echo 'Building and pushing Docker image...'

                    // Using withDockerRegistry for simplified Docker authentication
                    docker.withDockerRegistry(url: "${DOCKER_REGISTRY}", credentialsId: "${DOCKER_CREDENTIALS_ID}") {
                        // Build Docker image
                        sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."

                        // Push the image to Docker Hub
                        sh "docker push ${DOCKER_IMAGE}:${env.BUILD_ID}"
                    }
                }
            }
        }

        stage('Deploy to QA') {
            steps {
                echo 'Deploying to QA environment...'
                // Optional deployment steps for QA environment (e.g., pull Docker image and run it)
            }
        }

        stage('Test') {
            steps {
                dir('server') { // Change directory to 'server'
                    echo 'Running tests...'
                    // Add actual test command here, for example:
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