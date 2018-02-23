app.controller("mainController", function ($scope, $localStorage) {

    var vm = this;
    vm.data = {};
    vm.$storage = $localStorage;
    // login data autorization
    vm.showInputs = false;
  
    vm.targetInputRow = targetInputRow;
  
    function targetInputRow() {
      vm.showInputs = !vm.showInputs;
    }
  
    vm.clearAll = function () {
      vm.data.firstname = null;
      vm.data.middlename = null;
      vm.data.lastname = null;
      vm.data.streetaddress = null;
      vm.data.dateformat = null;
      vm.data.balance = null + " $";
      vm.dara.dreditcard = null
  
    };
  
    vm.submit = submit;
    vm.arr = vm.$storage.arr || [];
  
    function submit() {
      var obj = {
        firstname: vm.data.firstname,
        middlename: vm.data.middlename,
        lastname: vm.data.lastname,
        streetaddress: vm.data.streetaddress,
        dateformat: vm.data.dateformat,
        balance: vm.data.balance,
        dreditcard: vm.data.dreditcard
        
      };
  
      vm.arr.push(obj);
      vm.$storage.arr = vm.arr;
      console.log(obj);
  
    }
  
    vm.removeRow = function (index) {
      vm.newAfterRemove = [];
      vm.arr.splice(index, 1);
      angular.forEach(vm.arr, function (index) {
        if (!index.removeRow) {
          vm.newAfterRemove.push(index);
          vm.$storage.newAfterRemove = vm.newAfterRemove;
        }
      });
      vm.$storage.arr = vm.$storage.newAfterRemove;
      vm.$storage.arr = vm.arr;
      console.log(vm.arr);
  
    };
  
    vm.submitBtn = false;
    vm.saveBtn = false;
  
    vm.edit = function (id) {
      vm.showInputs = true;
      vm.submitBtn = true;
      vm.saveBtn = true;
  
      for (i = 0; i < vm.arr.length; i++) {
  
        if (vm.arr[i].id == id) {
          vm.data.myid = id;
          vm.data.firstname = vm.arr[i].firstname;
          vm.data.middlename = vm.arr[i].middlename;
          vm.data.lastname = vm.arr[i].lastname;
          vm.data.streetaddress = vm.arr[i].streetaddress;
          vm.data.dateformat = vm.arr[i].dateformat;
          vm.data.balance = vm.arr[i].balance;
          vm.data.dreditcard = vm.arr[i].dreditcard;
        }
      }
    };
  
    vm.savedata = function () {
      vm.newAfterEdit = [];
      for (i = 0; i < vm.arr.length; i++) {
        if (vm.arr[i].id == vm.data.myid) {
          vm.arr[i] = ({
            'firstname': vm.data.firstname,
            'middlename': vm.data.middlename,
            'lastname': vm.data.lastname,
            'streetaddress': vm.data.streetaddress,
            'dateformat': vm.data.dateformat,
            'balance': vm.data.balance ,
            'dreditcard': vm.data.dreditcard  
          });
          vm.showInputs = true;
          vm.submitBtn = false;
          vm.saveBtn = false;
        }
      }
  
      angular.forEach(vm.arr, function (index) {
        if (!index.savedata) {
          vm.newAfterEdit.push(index);
          vm.$storage.newAfterEdit = vm.newAfterEdit;
        }
      });
  
      vm.$storage.arr = vm.$storage.newAfterRemove;
      vm.$storage.arr = vm.arr;
      console.log(vm.arr);
    };
  
  });