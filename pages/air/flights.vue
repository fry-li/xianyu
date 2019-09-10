<template>
   <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"/>

                <!-- 航班头部布局 -->
                <FlightsListHead/>

                <div>
                <!-- 航班信息 -->
               <FlightsItem 
                    v-for="(item, index) in dataList"
                    :key="index"
                    :data="item"/>

                <!-- 分页 -->
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

            <!-- 侧边栏 -->
            <FlightsAside/>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters"
import FlightsAside from "@/components/air/flightsAside"
export default {
    data(){
        return{
            // 机票列表返回的总数据
            flightsData:{
                info:{},
                options: {}
            },
            cacheFlightsData:{
                info:{},
                options:{}
            },
            // 当前显示的列表数组
            dataList:[],
            pageIndex:1,
            pageSize:5,
            total:0
        }
    },
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    methods: {
        //传递该方法给子组件用于修改dataList
        setDataList(arr){
            this.flightsData.flights =arr;
            console.log( this.flightsData.flights)
            // 重新回到第一页
            this.pageIndex = 1;
            //按照数学公式切换dataList的值
            this.dataList = this.flightsData.flights.slice(
                (this.pageIndex-1)* this.pageSize,
                this.pageIndex * this.pageSize
            )
            //修改总条数
            this.total= arr.length
        },
        // 每页条数切换时候触发
        handleSizeChange(val){
            this.pageSize = val;    
            this.dataList = this.flightsData.flights.slice(0,this.pageSize)
        },
        // 页码切换时候触发
        handleCurrentChange(val){
            this.pageIndex = val;
            this.dataList = this.flightsData.flights.slice( 
                (this.pageIndex-1)*this.pageSize,
                this.pageIndex*this.pageSize
            )
        }
    },
    mounted(){
        this.$axios({
            url:'airs',
            params:this.$route.query
        })
        .then(res => {
            // console.log(res)
            // 赋值给总数据
            this.flightsData = res.data;
            // 赋值给缓存总数据
            this.cacheFlightsData = {...res.data};
            // console.log(222222222,this.flightsData)
            // 重新返回第一页
            this.pageIndex=1
            //分页的总条数
            this.total=this.flightsData.flights.length;
            //第一页的值
            this.dataList=this.flightsData.flights.slice(0,this.pageSize);
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }
    .flights-content{
        width:745px;
        font-size:14px;
    }
    .aside{
        width:240px;
    } 
</style>