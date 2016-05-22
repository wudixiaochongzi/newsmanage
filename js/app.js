
var news=[
    {
        id: 0,
        title:'印媒猜想中国将利用俄技术研制垂降型歼31战机',
        content:'鹘鹰2.0战机是早期FC-31”鹘鹰“双发中型隐形战斗机的改进版，也是第二架鹘鹰战机的原型机，其最大的外观亮点是机头下方，带有钻石截面光学窗口，类似歼-20的先进光电系统。',
        time:''
    },
    {
        id: 1,
        title:'艰辛！76人摆烂5季终获状元签 主帅抽中犹如夺冠',
        content:'凤凰体育讯 北京时间5月18日，76人终于获得状元签了。代表76人抽签的主帅布朗在听到湖人再次抽得榜眼签之后，激动得就像是夺冠一样，握拳怒吼。',
        time:''
    }
];

angular.module('news',['ngRoute']).config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'tpls/list.html',
        controller:'list'
    }).when('/show:id',{
        templateUrl:'tpls/show.html',
        controller:'show'
    }).when('/edit:id',{
        templateUrl:'tpls/edit.html',
        controller:'edit'
    }).when('/add',{
        templateUrl:'tpls/add.html',
        controller:'add'
    })
}).controller('list',function($scope){//list页面的控制器
    $scope.news=news;
}).controller('show',function($scope,$routeParams){//show页面的控制器
    $scope.news=news;
    angular.forEach($scope.news,function(o,i){//$routeParams这个对象存放着在list页面点击的那条新闻的id所以这里循环数据库，找到对应id的那条新闻数据保存在showNew这个属性上
        if (':'+o.id==$routeParams.id){
            $scope.showNew=o;
        }
    });
}).controller('edit',function($scope,$routeParams,$location){//编辑页面的控制器
    $scope.news=news;
    angular.forEach($scope.news,function(o,i){//这里也和show页面是一个道理，当前这条新闻的id保存在$routeParams这个属性上
        if (':'+o.id==$routeParams.id){
            $scope.title= o.title;
            $scope.content= o.content;
            $scope.editNew=o;
        }
    });
    $scope.submitNew=function(){//这个函数是编辑完成提交按钮的功能
        if ($scope.editNew.title==''&&$scope.editNew.content==''){//如果编辑的时候所有都为空，提交时候让她为原来的数据。title和content这两个属性上就保存的原来的数据
            $scope.editNew.title=$scope.title;
            $scope.editNew.content=$scope.content;
        }
        $location.path('/show'+$routeParams.id);//$location上的path方法就是用来实现跳转的
    }
}).controller('add',function($scope,$location){//添加新闻页面的控制器
    $scope.news=news;
    $scope.title='';
    $scope.content='';
    $scope.addNew=function(){//添加新闻函数，点击提交的时候执行这个函数
        var o={};
        o.id= $scope.news[$scope.news.length-1].id+1;
        o.title=$scope.title;
        o.content=$scope.content;
        o.time=new Date();
        if (o.title==''&&o.content==''){
            alert('标题或内容不能为空');
            return;
        }
        news.push(o);
        $location.path('/');//跳转到首页
    }
});