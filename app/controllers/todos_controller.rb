class TodosController < ApplicationController

  def index
    @todos = Todo.all

    respond_to do |format|
      format.html
      format.json {render :json => @todos}
    end
  end


  def create
    @todo = Todo.new
    @todo.name = params[:name]
    @todo.save
    render :status => :created, :json => @todo
  end
end