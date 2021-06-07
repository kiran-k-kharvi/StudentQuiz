

$(document).ready(function()
{
    console.log(question_set)

    console.log(correct_ans)
    console.log(correct_ans_index)
    $("#question").text(q_no+") "+question_set[q_no-1].question.replaceAll("&#039;","\'"))
    $("#0").text(question_set[q_no-1].answers[0])
    $("#1").text(question_set[q_no-1].answers[1])
    $("#2").text(question_set[q_no-1].answers[2])
    $("#3").text(question_set[q_no-1].answers[3])
        
})


$(".test").click(
    function()
    {

        $(".test").removeClass("active")
        $(this).addClass("active")
        $("#next_btn").removeClass("d-none")
        
    }
)

$("#next_btn").click(
    function()
    {
        console.log(q_no)
        if(!(q_no> 10))
        {
        var selected ='' 
        $('.test').each(function (){
            if ($(this).hasClass("active"))
            {
              

                if($(this).text() == correct_ans)
                {
                correct_ans_count = correct_ans_count+5
                $(this).removeClass("btn-light") 
                $(this).removeClass("active") 
                $(this).addClass("btn-success")
                }
                else
                {
                $(this).removeClass("btn-light") 
                $(this).removeClass("active") 
                $(this).addClass("btn-danger")
                selected = "#"+correct_ans_index

                $(selected).removeClass("btn-light")
                $(selected).addClass("btn-success")

                
                }

                setTimeout(
                function(){
                correct_ans = question_set[q_no-1].correct_answer
                correct_ans_index = question_set[q_no-1].answers.indexOf(correct_ans)
                $("#question").text(q_no+") "+question_set[q_no].question.replaceAll("&#039;","\'"))
                $("#0").text(question_set[q_no-1].answers[0])
                $("#1").text(question_set[q_no-1].answers[1])
                $("#2").text(question_set[q_no-1].answers[2])
                $("#3").text(question_set[q_no-1].answers[3])
                q_no = q_no+1
                $(".test").removeClass("active")
                $(".test").removeClass("btn-success")
                $(".test").removeClass("btn-danger")
                $(".test").addClass("btn-light")
                $("#next_btn").addClass("d-none")



                 }
                , 1000);
            }
        })

    }
    else
    {
        $("#ans_block").hide();

        var end = new Date().getTime();
        var display_string =""
        var result_string = "You have Scored: "+correct_ans_count+" marks out of 50 marks."
        let time_taken = time(start,end)
        let time_array = time_taken.split(":")
        hour = time_array[0]
        min = time_array[1]
        sec = time_array[2]
        $("#score").removeClass("d-none")
        if(parseInt(hour)>0)
        {
            display_string = "You took "+hour+" hours "+min+" minutes "+sec+" second to complete the test"
            $("#score").text(result_string)
            $("#question").text(display_string)
        }
        else if(parseInt(min)>0)
        {
            display_string = "You took "+min+" minutes "+sec+" second to complete the test"
            $("#score").text(result_string)
            $("#question").text(display_string)
        }
        else
        {
            display_string = "You took "+sec+" second to complete the test"
            $("#score").text(result_string)
            $("#question").text(display_string)
        }
        

    }
}
)

function time(start,end) {
    var duration = end-start
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}