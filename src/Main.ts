//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        //var bgContainer = new egret.DisplayObjectContainer();
    
        var p1Container = new egret.DisplayObjectContainer(); 
        var p2Container = new egret.DisplayObjectContainer();
        var p3Container = new egret.DisplayObjectContainer();

        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;

        //bgContainer.width = stageW;
        //bgContainer.height = 3*stageH;

        this.addChild(p1Container);
        p1Container.width = stageW;
        p1Container.height = stageH;

        this.addChild(p2Container);
        p2Container.width = stageW;
        p2Container.height = stageH;
        p2Container.y = stageH;

        this.addChild(p3Container);
        p3Container.width = stageW;
        p3Container.height = stageH;
        p3Container.y = 2*stageH;

        var bg1:egret.Bitmap = this.createBitmapByName("mbg1_jpg");
        p1Container.addChild(bg1);
        
        bg1.width = stageW;
        bg1.height = stageH;
        


        var Mask2 = new egret.Shape();
        Mask2.graphics.beginFill(0x000000, 1);
        Mask2.graphics.drawRect(0, 0, stageW, 172);
        Mask2.graphics.endFill();
        Mask2.y = stageH/2 - 172/2;
        p1Container.addChild(Mask2);
        var Mask2move = egret.Tween.get(Mask2);
        Mask2move.wait(800);
        Mask2move.to({"alpha":0.45},1000);
       
        var Mask1 = new egret.Shape();
        Mask1.graphics.beginFill(0x000000, 0.5);
        Mask1.graphics.drawRect(0, 0, stageW, 172);
        Mask1.graphics.endFill();
        Mask1.y = 396;
        p1Container.addChild(Mask1);
        

        var Mask3 = new egret.Shape();
        Mask3.graphics.beginFill(0x000000, 0.5);
        Mask3.graphics.drawRect(0, 0, stageW, 172);
        Mask3.graphics.endFill();
        Mask3.y = stageH - 396 - 172;
        p1Container.addChild(Mask3);


        


        var yin:egret.Bitmap = this.createBitmapByName("Yin_png");
        p1Container.addChild(yin);
        yin.scaleX = 0.55;
        yin.scaleY = 0.55;
        yin.x = 25;
        yin.y = 18;


        var icon:egret.Bitmap = this.createBitmapByName("logo_png");
        p1Container.addChild(icon);
        icon.scaleX = 0.5;
        icon.scaleY = 0.5; 
        icon.x = stageW/2 - icon.width/4;
        icon.y = stageH/8 + icon.height/16;
        
        var title = new egret.TextField();
        p1Container.addChild(title);
        title.alpha = 0;
        title.textColor = 0xffffff;
        title.width =  stageW - 172;
        title.textAlign = "center";
        title.fontFamily = "Microsoft YaHei";
        title.text = "自我介绍";
        title.size = 48;
        title.strokeColor = 0xdd31fc;
        title.stroke = 1;
        title.x = stageW/2 - title.width/2;
        title.y = stageH/2 - title.height/2;
        var titletw = egret.Tween.get(title);
        titletw.wait(800);
        titletw.to({"alpha":1},1000);



        var textfield = new egret.TextField();
        p1Container.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.fontFamily = "Microsoft YaHei";
        textfield.size = 30;
        textfield.textColor = 0xffffff;
        textfield.x = stageW/2 - textfield.width/2;
        textfield.y = stageH/2 + 115;
        this.textfield = textfield;
        

        var poem = new egret.TextField();
        p1Container.addChild(poem);
        poem.alpha = 1;
        poem.textColor = 0xffffff;
        poem.textAlign = "center";
        
        poem.text = "One sight";
        poem.size =24;
        poem.strokeColor = 0xdd31fc;
        poem.stroke = 1;
        poem.x = stageW - poem.width - 10;
        poem.y = stageH - poem.height - 10;
     


   


        //page2 - start 
        var bg2:egret.Bitmap = this.createBitmapByName("mbg22_jpg");
        p2Container.addChild(bg2);
        bg2.width = stageW;
        bg2.height = stageH;
        

        var poem2 = new egret.TextField();
        p2Container.addChild(poem2);
        poem2.alpha = 1;
        poem2.textColor = 0xffffff;
        poem2.textAlign = "center";
        
        poem2.text = "Forever";
        poem2.size =24;
        poem2.strokeColor = 0xc0b0ca;
        poem2.stroke = 1;
        poem2.x = stageW - poem2.width - 10;
        poem2.y = stageH - poem2.height - 10;

        var luopan:egret.Bitmap = this.createBitmapByName("luopan_png");
        p2Container.addChild(luopan);
       
        luopan.anchorOffsetX = 301;
        luopan.anchorOffsetY = 325;
        luopan.x = 0;
        luopan.y = 0;
        
        var xinggebg = new egret.Shape();
        xinggebg.graphics.beginFill(0x000000, 0.5);
        xinggebg.graphics.drawRect(0, 0, stageW, 265);
        xinggebg.graphics.endFill();
        xinggebg.scaleX = 0.9;
        xinggebg.x = 30;
        xinggebg.y = 325;
        p2Container.addChild(xinggebg);


        var textxingge = new egret.TextField();
        p2Container.addChild(textxingge);
        textxingge.width = stageW - 80;
        textxingge.x = 46;
        textxingge.y = 360;
        textxingge.height = 245;
        textxingge.textColor = 0xffffff;
        textxingge.size = 30;
        textxingge.fontFamily = "Microsoft YaHei";
        textxingge.textAlign = "left";
        textxingge.text = "   关于性格，怎么说呢。拿两个关键字就是“外冷内热”和“多重性格”。取决于自己，有时候不善于和陌生人打交道。但在某种情况下的我可能并不会这样，反而会很善于去交流。比较随和，对于长时间没有联系过的圈子有种小抵触，自我感觉很难再融进去啊。";


        var xingge:egret.Bitmap = this.createBitmapByName("xingge_png");
        p2Container.addChild(xingge);
  

        xingge.x = stageW/1.5;
        xingge.y = stageH/6;

     
        var tedianbg = new egret.Shape();
        tedianbg.graphics.beginFill(0x000000, 0.5);
        tedianbg.graphics.drawRect(0, 0, stageW, 285);
        tedianbg.graphics.endFill();
        tedianbg.scaleX = 0.9;
        tedianbg.x = 30;
        tedianbg.y = 815;
        p2Container.addChild(tedianbg);

        var texttedian = new egret.TextField();
        p2Container.addChild(texttedian);
        texttedian.width = stageW - 88;
        texttedian.x = 46;
        texttedian.y = 825;
        texttedian.height = 285;
        texttedian.textColor = 0xffffff;
        texttedian.size = 30;
        texttedian.fontFamily = "Microsoft YaHei";
        texttedian.textAlign = "left";
        texttedian.text ="    每次一说有什么特长之类的,就感觉比较尴尬。自认为我就是那种九年义务教务流水线式组装出来的学生。也是一直让我觉得比较后悔，没在之前的日子里对自己未来的路多做一些探索。\n    探索是必要的，毕竟不做不知理。有时候我也问自己到底有什么特点，但试着做一些东西出来之后，回过头总结才看到这就是我。";





        var tedian:egret.Bitmap = this.createBitmapByName("tedian_png");
        p2Container.addChild(tedian);
  

        tedian.x = 0;
        tedian.y = stageH/1.75;
        


     

       



        //page3 - start
        var bg3:egret.Bitmap = this.createBitmapByName("mbg33_jpg")
        p3Container.addChild(bg3);
        bg3.width = stageW;
        bg3.height = stageH;
        
      



        var zijibg = new egret.Shape();
        zijibg.graphics.beginFill(0x000000, 0.5);
        zijibg.graphics.drawRect(0, 0, stageW, 345);
        zijibg.graphics.endFill();
        zijibg.scaleX = 0.9;
        zijibg.x = 30;
        zijibg.y = 150;
        p3Container.addChild(zijibg);
        

        var textziji = new egret.TextField();
        p3Container.addChild(textziji);
        textziji.width = stageW - 90;
        textziji.x = 46;
        textziji.y = 190;
        textziji.height = 345;
        textziji.textColor = 0xffffff;
        textziji.size = 30;
        textziji.fontFamily = "Microsoft YaHei";
        textziji.textAlign = "left";
        textziji.text ="    关于自己，再说两句，有想法，但有时候行动力不高，自信什么的有点不足。\n    但至少关于我所爱的事物，不论他人说些什么，喜欢或者是讨厌。理解还是不明所以。我都会一直遵循我内心的想法，将自己融入到一个个有共同感触的人们里，然后用我的经历的种种和学到的知识来创造一个让人们引发共鸣的东西。是我一直坚守的纲要。";



        var ziji:egret.Bitmap = this.createBitmapByName("ziji_png");
        p3Container.addChild(ziji);
        ziji.x = stageW/2 - ziji.width/2;
        ziji.y = 40;
        


        var choice:egret.Bitmap = this.createBitmapByName("choice_png");
        p3Container.addChild(choice);
  
        choice.anchorOffsetX = 218;
        choice.anchorOffsetY = 209;
        choice.scaleX = 1.55;
        choice.scaleY = 1.55;
        choice.x = stageW/2;
        choice.y = stageH - choice.height/2;

        var poem3 = new egret.TextField();
        p3Container.addChild(poem3);
        poem3.alpha = 1;
        poem3.textColor = 0xffffff;
        poem3.textAlign = "center";
        
        poem3.text = "But lonely one";
        poem3.size =24;
        poem3.strokeColor = 0x39a29e;
        poem3.stroke = 1;
        poem3.x = stageW - poem3.width - 10;
        poem3.y = stageH - poem3.height - 10;
       
    

    
/*
       bgContainer.addChild(p1Container);
       p1Container.x = 0;
       p1Container.y = 0;

       bgContainer.addChild(p2Container);
       p2Container.x = 0;
       p2Container.y = stageH;

       bgContainer.addChild(p3Container);
       p3Container.x = 0;
       p3Container.y = 2*stageH;
*/
//页面滑动功能

        
        this.scrollRect= new egret.Rectangle(0,0,this.stage.stageWidth,3*stageH);
        this.cacheAsBitmap = true;
        this.touchEnabled = true;
        var init_TouchPointY:number = 0;//起始触摸点
        var init_StagePointY:number = 0;//起始Stage点
        var MoveDistance:number = 0;//移动距离

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startScroll, this);   //监听事件1
        
        function startScroll(e: egret.TouchEvent): void {
            if((this.scrollRect.y%stageH)!= 0) {

                this.scrollRect.y = init_StagePointY;  //每次滑动都卡主一个stage的高度
            }

            init_TouchPointY = e.stageY;
            init_StagePointY = this.scrollRect.y;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, onScroll, this);//实时计算滑动的距离值
        }

        function onScroll(e: egret.TouchEvent): void {
         
            var rect: egret.Rectangle = this.scrollRect;
            MoveDistance = init_TouchPointY - e.stageY;
            if(MoveDistance != 0){
            rect.y = (init_StagePointY + MoveDistance);
            this.scrollRect = rect;
            }
            
        }


        this.addEventListener(egret.TouchEvent.TOUCH_END, stopScroll, this);   //监听事件2

        function stopScroll(e: egret.TouchEvent): void {

            var rect: egret.Rectangle = this.scrollRect;

            if((MoveDistance >= (this.stage.stageHeight/3)) && init_StagePointY!=2*stageH) { //如果移动距离超了1/3个高度，并且没到第二张，往下滑一页
                 
                rect.y = init_StagePointY + stageH;
                this.scrollRect = rect;
               
            }else if((MoveDistance <= (-(this.stage.stageHeight/3))) && init_StagePointY!=0 && MoveDistance != 0) {//如果移动距离超了-1/3个高度，并且没到第一页，往上滑一页

                rect.y = init_StagePointY - stageH;
                this.scrollRect = rect;

            } else{

                rect.y = init_StagePointY;
                this.scrollRect = rect;

            }

            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onScroll,this);

        }



        //页面滑动功能结束

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */





    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 1000);
            tw.wait(2000);
            tw.to({"alpha": 0}, 1000);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


