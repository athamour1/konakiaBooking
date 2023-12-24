pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    stages {

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'yarn'
                    sh 'yarn build'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'yarn'
                    sh 'yarn build'
                }
            }
        }

    }

}
