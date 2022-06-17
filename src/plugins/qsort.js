Array.prototype.QSORT = function(_compare){
    if(this.length == 0) return;
    var _this = this;		

    var compare = _compare || function(res1, res2){
        return res1 < res2 ? true: false;
    };

    _qsort(this);

    function _qsort(src){
        qsort(src,0,src.length-1);
    }
    
    function qsort(arr, left, right){
        var key = arr[left];
        var blank = left;
        var i = left;
        var j = right;
        while(i < j){
            while(i < j){
                if(compare(_this[j], _this[blank])){
                    arr[blank] = arr[j];
                    arr[j] = key;
                    blank = j;
                    break;
                }
                j--;
            }
            while(i < j){
                if(compare(_this[blank], _this[i])){
                    arr[blank] = arr[i];
                    arr[i] = key;
                    blank = i;
                    break;
                }
                i++;
            }
        }
        
        if(left != right){
            if(blank != left)   qsort(arr, left, blank - 1);
            if(blank != right)  qsort(arr, blank + 1, right);
        }	
    }
}