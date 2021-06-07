


$(document).ready(function()
{
    
    $("#question").text(q_no+1+") "+question_set[q_no].question.replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
    $("#0").text(question_set[q_no].answers[0].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
    $("#1").text(question_set[q_no].answers[1].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
    $("#2").text(question_set[q_no].answers[2].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
    $("#3").text(question_set[q_no].answers[3].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
        
})


$(".test").click(
    function()
    {

        $(".test").removeClass("active")
        $(this).removeClass("btn-light")
        $(this).addClass("active")
        $("#next_btn").removeClass("d-none")
        
    }
)

$("#next_btn").click(
    function()
    {
        console.log(q_no)
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
                if(q_no<(total_question-1))
                {
                setTimeout(
                function(){
                q_no = q_no+1
                correct_ans = question_set[q_no].correct_answer
                console.log(correct_ans)
                correct_ans_index = question_set[q_no].answers.indexOf(correct_ans)
                $("#question").text(q_no+1+") "+question_set[q_no].question.replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
                $("#0").text(question_set[q_no].answers[0].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
                $("#1").text(question_set[q_no].answers[1].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
                $("#2").text(question_set[q_no].answers[2].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
                $("#3").text(question_set[q_no].answers[3].replaceAll("&#039;","\'").replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','\"'));
                $(".test").removeClass("active")
                $(".test").removeClass("btn-success")
                $(".test").removeClass("btn-danger")
                $(".test").addClass("btn-light")
                $("#next_btn").addClass("d-none")
                 }
                , 1000);
                }
            else
            {
                setTimeout(function()
                {
                

                $("#ans_block").hide();
                $("#question").addClass("d-none")
                var end = new Date().getTime();
                var display_string =""
                var result_string = "You have Scored: "+correct_ans_count+" marks out of 50 marks."
                let time_taken = time(start,end)
                let time_array = time_taken.split(":")
                hour = time_array[0]
                min = time_array[1]
                sec = time_array[2]
                $("#score").removeClass("d-none")
                $("#time_taken").removeClass("d-none")
                if(parseInt(hour)>0)
                {
                    display_string = "You took "+hour+" hours "+min+" minutes "+sec+" second to complete the test"
                    $("#score").text(result_string)
                    $("#time_taken").text(display_string)

                }
                else if(parseInt(min)>0)
                {
                    display_string = "You took "+min+" minutes "+sec+" second to complete the test"
                    $("#score").text(result_string)
                    $("#time_taken").text(display_string)
                }
                else
                {
                    display_string = "You took "+sec+" second to complete the test"
                    $("#score").text(result_string)
                    $("#time_taken").text(display_string)
                }
            }
                ,1000)

                setTimeout(function()
                {
                    window.location="http://127.0.0.1:8000/";

                },5000)

             }
            }

        }
        )
    })

    
    


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