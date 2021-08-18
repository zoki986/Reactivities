using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;
using Mapster;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class EditValidator : AbstractValidator<Command>
        {
            public EditValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context) => _context = context;
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if(activity is null) return null;

                request.Activity.Adapt(activity);

                return await _context.SaveChangesAsync() > 0 
                ? Result<Unit>.Success(Unit.Value) 
                : Result<Unit>.Failure("Failed to update activity."); 
            }
        }
    }
}