(function () {
    'use strict';

    angular
        .module('app.patients')
        .controller('PatientController', PatientController);

    PatientController.$inject = ['$state', '$q', '$stateParams', 'dataservice', 'logger', '$translate'];

    /* @ngInject */
    function PatientController($state, $q, $stateParams, dataservice, logger, $translate) {
        var vm = this;

        vm.patient = undefined;

        vm.goBack = goBack;
        vm.isUnchanged = isUnchanged;
        vm.getFullName = getFullName;
        vm.save = save;

        vm.title = 'PATIENT';

        vm.patiendNID = $stateParams.nid;

        if (vm.patiendNID) {
            activate();
        }

        vm.getPatient = getPatient;
        // vm.gotoPatient = gotoPatient;
        ///////////////////////////////////////////////////

        function activate() {
            return getPatient(vm.patiendNID).then(function () {
                $translate('ACTIVACTION_DETAILS').then(function (translationValue) {
                    logger.info(translationValue);
                });
            });
        }

        function cancel() {
            vm.patient = angular.copy(vm.original);
        }

        function getPatient(id) {
            return dataservice.getPatient(id)
                .then(function (result) {
                    console.info(result);
                    vm.patient = result;
                    // vm.newPatient = false;
                    vm.original = angular.copy(vm.patient);
                    $translate('PATIENT_FOUND').then(function (translationValue) {
                        logger.success(translationValue);
                    });
                    return vm.patient;
                });
        }

        function goBack() {
            // $window.history.back();
            $state.go('patients');
        }

        function isUnchanged() {
            return angular.equals(vm.patient, vm.original);
        }

        function getFullName() {
            return vm.patient && vm.patient.firstName + ' ' + vm.patient.lastName;
        }

        function save() {
            vm.original = angular.copy(vm.patient);
            dataservice.savePatient(vm.original).then(function (result) {
                logger.success('Paciente modificado com sucesso');
            });
        }
    }//patientController

})();
